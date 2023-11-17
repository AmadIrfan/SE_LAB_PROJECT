import 'package:admin_app/res/routes/route_name.dart';
import 'package:admin_app/widgets/chart.dart';
import 'package:admin_app/widgets/publisher_card.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import '../models/publisher_model.dart';

class PublisherManage extends StatefulWidget {
  const PublisherManage({super.key});

  @override
  State<PublisherManage> createState() => _PublisherManageState();
}

class _PublisherManageState extends State<PublisherManage> {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  Map<String, double> dataMap = {
    "Total": 5,
    "active": 3,
    "inactive": 2,
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: const Text('Publisher'),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.pushNamed(
                context,
                RouteName.addPublisher,
              );
            },
            icon: const Icon(
              Icons.add,
              color: Colors.black,
            ),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          setState(() {});
        },
        child: Column(
          children: [
            PIChart(chartName: 'Statistics', data: dataMap),
            Expanded(
              child: StreamBuilder(
                stream: _firestore.collection('publisher').snapshots(),
                builder: (BuildContext context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child: CircularProgressIndicator.adaptive(),
                    );
                  } else {
                    if (snapshot.hasData) {
                      return ListView.builder(
                        itemCount: snapshot.data!.docs.length,
                        itemBuilder: (BuildContext context, int index) {
                          Publisher u = Publisher.fromMap(
                            (snapshot.data!).docs[index].data(),
                          );
                          return PublisherCard(
                            pModel: u,
                          );
                        },
                      );
                    } else {
                      return const Center(
                        child: CircularProgressIndicator(),
                      );
                    }
                  }
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
