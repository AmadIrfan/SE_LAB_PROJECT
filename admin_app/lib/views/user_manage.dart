import 'package:admin_app/res/colors.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

import '../models/user_model.dart';
import '../widgets/chart.dart';
import '../widgets/user_card.dart';

class UserManage extends StatefulWidget {
  const UserManage({super.key});

  @override
  State<UserManage> createState() => _UserManageState();
}

class _UserManageState extends State<UserManage> {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  Map<String, double> dataMap = {
    "Total": 5,
    "active": 3,
    "inactive": 2,
  };
  String? filter = 'all';

  Stream<QuerySnapshot<Map<String, dynamic>>> collection =
      FirebaseFirestore.instance.collection('user').snapshots();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: const Text('Users'),
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
                        collection = _firestore.collection('user').snapshots();
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
                            .collection('user')
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
                            .collection('user')
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
                    if (snapshot.hasData) {
                      if (snapshot.data!.docs.isEmpty) {
                        return const Center(
                          child: Text('No document Found'),
                        );
                      }
                      return ListView.builder(
                        itemCount: snapshot.data!.docs.length,
                        itemBuilder: (BuildContext context, int index) {
                          UserModel u = UserModel.fromMap(
                              snapshot.data!.docs[index].data());
                          return UserCard(
                            userModel: u,
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
                    // color: MaterialStateProperty.resolveWith<Color?>(
                    //   (Set<MaterialState> states) {
                    //     if (states.contains(MaterialState.pressed)) {
                    //       return Colors.red; // Color when the button is pressed
                    //     }
                    //     return Colors.blue; // Default color
                    //   },
                    // ),
                    // backgroundColor: darkBlueColor,
