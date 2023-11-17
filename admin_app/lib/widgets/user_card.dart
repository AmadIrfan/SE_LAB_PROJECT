import 'package:flutter/material.dart';
import 'package:admin_app/models/user_model.dart';

class UserCard extends StatelessWidget {
  const UserCard({super.key, required this.userModel});

  final UserModel userModel;
  @override
  Widget build(BuildContext context) {
    return Card(
      color: const Color(0xFFD9D9D9),
      child: ListTile(
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
        trailing: bool.parse(
          userModel.isSuperAdmin.toString(),
        )
            ? PopupMenuButton(
                itemBuilder: (context) => [
                  const PopupMenuItem(
                    child: Text('edit'),
                  ),
                  const PopupMenuItem(
                    child: Text('In Active'),
                  ),
                ],
              )
            : const SizedBox(),
      ),
    );
  }
}
