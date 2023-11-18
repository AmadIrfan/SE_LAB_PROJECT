import 'package:admin_app/res/colors.dart';
import 'package:admin_app/widgets/admins_card.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:pie_chart/pie_chart.dart';
import '../models/user_model.dart';
import '../widgets/chart.dart';

class StaffManage extends StatefulWidget {
  const StaffManage({super.key});

  @override
  State<StaffManage> createState() => _StaffManageState();
}

class _StaffManageState extends State<StaffManage> {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  Map<String, double> dataMap = {
    "Total": 5,
    "active": 3,
    "inactive": 2,
  };
  String? filter = 'all';

  Stream<QuerySnapshot<Map<String, dynamic>>> collection =
      FirebaseFirestore.instance.collection('admin').snapshots();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: const Text('Staff Manage'),
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          setState(() {});
        },
        child: Column(
          children: [
            Container(
              color: darkBlueColor.withOpacity(0.3),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  FilterChip(
                    selected: filter == 'all' ? true : false,
                    onSelected: (v) {
                      setState(() {
                        collection = _firestore.collection('admin').snapshots();
                      });
                      filter = 'all';
                    },
                    label: const Text('All'),
                  ),
                  FilterChip(
                    selected: filter == 'active' ? true : false,
                    onSelected: (v) {
                      setState(() {
                        collection = _firestore
                            .collection('admin')
                            .where(
                              'active',
                              isEqualTo: true,
                            )
                            .snapshots();
                      });
                      filter = 'active';
                    },
                    label: const Text('Active'),
                  ),
                  FilterChip(
                    selected: filter == 'inActive' ? true : false,
                    onSelected: (v) {
                      setState(() {
                        collection = _firestore
                            .collection('admin')
                            .where(
                              'active',
                              isEqualTo: false,
                            )
                            .snapshots();
                      });
                      filter = 'inActive';
                    },
                    label: const Text('In Active'),
                  ),
                ],
              ),
            ),
            PIChart(chartName: 'Statistics', data: dataMap),
            Expanded(
              child: StreamBuilder(
                stream: collection,
                builder: (BuildContext context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child: CircularProgressIndicator.adaptive(),
                    );
                  } else {
                    if (snapshot.data!.docs.isEmpty) {
                      return const Center(
                        child: Text('No document Found'),
                      );
                    }

                    return ListView.builder(
                      itemCount: snapshot.data!.docs.length,
                      itemBuilder: (BuildContext context, int index) {
                        UserModel u = UserModel.fromMap(
                          snapshot.data!.docs[index].data(),
                        );

                        return ADminCards(
                          userModel: u,
                        );
                      },
                    );
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
