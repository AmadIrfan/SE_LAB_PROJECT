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
            PIChart(chartName: 'Statistics', data: dataMap),
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
                          UserModel u = UserModel.fromMap(
                              snapshot.data!.docs[index].data());
                          //  UserModel(
                          //   id: (snapshot.data!.docs[index]['id']).toString(),
                          //   email: (snapshot.data!.docs[index]['email'])
                          //       .toString(),
                          //   isSuperAdmin: bool.parse((snapshot.data!.docs[index]
                          //           ['isSuperAdmin'])
                          //       .toString()),
                          //   profileImage: (snapshot.data!.docs[index]
                          //           ['profileImage'])
                          //       .toString(),
                          //   active: bool.parse((snapshot.data!.docs[index]
                          //           ['active'])
                          //       .toString()),
                          //   phone: (snapshot.data!.docs[index]['phone'])
                          //       .toString(),
                          //   name:
                          //       (snapshot.data!.docs[index]['name']).toString(),
                          //   createDate: DateTime.parse(snapshot
                          //       .data!.docs[index]['createDate'] as String),
                          //   updateDate: DateTime.parse(snapshot
                          //       .data!.docs[index]['updateDate'] as String),
                          //   role:
                          //       (snapshot.data!.docs[index]['role']).toString(),
                          // );
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
