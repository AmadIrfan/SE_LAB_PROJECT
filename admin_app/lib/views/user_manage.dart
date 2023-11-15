import 'package:admin_app/models/user_model.dart';
import 'package:admin_app/widgets/user_card.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class UserManage extends StatefulWidget {
  const UserManage({super.key});

  @override
  State<UserManage> createState() => _UserManageState();
}

class _UserManageState extends State<UserManage> {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: const Text('Users'),
      ),
      body: Column(
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
