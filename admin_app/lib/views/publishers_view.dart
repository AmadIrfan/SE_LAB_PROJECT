import 'package:admin_app/res/routes/route_name.dart';
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
    "Flutter": 5,
    "React": 3,
    "Ionic": 2,
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
        onRefresh: () async {},
        child: Column(
          children: [
            Expanded(
              child: StreamBuilder(
                stream: _firestore.collection('user').snapshots(),
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
                          Publisher u = Publisher(
                            password: '',
                            fatherName: (snapshot.data!.docs[index]
                                    ['fatherName'])
                                .toString(),
                            gender: (snapshot.data!.docs[index]['gender'])
                                .toString(),
                            address: (snapshot.data!.docs[index]['address'])
                                .toString(),
                            bio: (snapshot.data!.docs[index]['bio']).toString(),
                            id: (snapshot.data!.docs[index]['id']).toString(),
                            email: (snapshot.data!.docs[index]['email'])
                                .toString(),
                            profileImage: (snapshot.data!.docs[index]
                                    ['profileImage'])
                                .toString(),
                            active: bool.parse((snapshot.data!.docs[index]
                                    ['active'])
                                .toString()),
                            phone: (snapshot.data!.docs[index]['phone'])
                                .toString(),
                            name:
                                (snapshot.data!.docs[index]['name']).toString(),
                            createDate: (snapshot.data!.docs[index]
                                    ['createDate'] as Timestamp)
                                .toDate(),
                            updateDate: (snapshot.data!.docs[index]
                                    ['updateDate'] as Timestamp)
                                .toDate(),
                          );
                          return PublisherCard(
                            pModel: u,
                          );
                        },
                      );
                    }
                     else {
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
