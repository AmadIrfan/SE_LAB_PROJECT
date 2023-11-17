import 'package:admin_app/data/firebase_methods.dart';
import 'package:admin_app/res/routes/route_name.dart';
import 'package:admin_app/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:admin_app/models/user_model.dart';
import 'package:provider/provider.dart';

class UserCard extends StatelessWidget {
  const UserCard({super.key, required this.userModel});

  final UserModel userModel;
  @override
  Widget build(BuildContext context) {
    final updateStatus = Provider.of<FireBaseMethods>(context, listen: false);
    return Card(
      color: const Color(0xFFD9D9D9),
      child: ListTile(
          onTap: () {
            Navigator.pushNamed(
              context,
              RouteName.viewDetailed,
              arguments: userModel,
            );
          },
          leading: CircleAvatar(
            radius: 30,
            backgroundColor: const Color(0xFFFFD88D),
            child: userModel.profileImage.toString().isEmpty
                ? const SizedBox()
                : Image.network(
                    userModel.profileImage.toString(),
                  ),
          ),
          title: Text(
            userModel.name.toString(),
            style: const TextStyle(
              color: Color(0xFF171B36),
              fontSize: 20,
              height: 0,
              fontFamily: 'Inter',
              fontWeight: FontWeight.w700,
            ),
          ),
          subtitle: Text(
            userModel.email.toString(),
            style: const TextStyle(
              color: Color(0xFF171B36),
              fontSize: 12,
              fontWeight: FontWeight.w500,
              height: 0,
              fontFamily: 'Inter',
            ),
          ),
          trailing: PopupMenuButton(
            itemBuilder: (context) => [
              // const PopupMenuItem(
              //   child: Text('edit'),
              // ),
              PopupMenuItem(
                child: const Text('In Active'),
                onTap: () async {
                  await updateStatus.updateStatusActive(
                      'user', userModel.id.toString());
                  Utils().showToast('User InActive');
                },
              ),
            ],
          )),
    );
  }
}
