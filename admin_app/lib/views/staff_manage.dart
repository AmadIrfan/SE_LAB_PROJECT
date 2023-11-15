import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import '../models/user_model.dart';
import '../widgets/user_card.dart';

class StaffManage extends StatefulWidget {
  const StaffManage({super.key});

  @override
  State<StaffManage> createState() => _StaffManageState();
}

class _StaffManageState extends State<StaffManage> {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  Map<String, double> dataMap = {
    "Flutter": 5,
    "React": 3,
    "Xamarin": 2,
    "Ionic": 2,
  };
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: const Text('Staff Manage'),
      ),
      body: Column(
        children: [
          Expanded(
            child: StreamBuilder(
              stream: _firestore.collection('admin').snapshots(),
              builder: (BuildContext context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(
                    child: CircularProgressIndicator.adaptive(),
                  );
                } else {
                  return ListView.builder(
                    itemCount: snapshot.data!.docs.length,
                    itemBuilder: (BuildContext context, int index) {
                      UserModel u = UserModel(
                        id: (snapshot.data!.docs[index]['id']).toString(),
                        email: (snapshot.data!.docs[index]['email']).toString(),
                        isSuperAdmin: bool.parse((snapshot.data!.docs[index]
                                ['isSuperAdmin'])
                            .toString()),
                        profileImage: (snapshot.data!.docs[index]
                                ['profileImage'])
                            .toString(),
                        active: bool.parse(
                            (snapshot.data!.docs[index]['active']).toString()),
                        phone: (snapshot.data!.docs[index]['phone']).toString(),
                        name: (snapshot.data!.docs[index]['name']).toString(),
                        createDate: (snapshot.data!.docs[index]['createDate']
                                as Timestamp)
                            .toDate(),
                        updateDate: (snapshot.data!.docs[index]['updateDate']
                                as Timestamp)
                            .toDate(),
                        role: (snapshot.data!.docs[index]['role']).toString(),
                      );
                      return UserCard(
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
    );
  }
}
