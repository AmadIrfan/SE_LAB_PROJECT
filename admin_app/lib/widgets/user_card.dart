import 'package:admin_app/models/user_model.dart';
import 'package:flutter/material.dart';

class UserCard extends StatelessWidget {
  const UserCard({super.key, required this.userModel});

  final UserModel userModel;
  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: CircleAvatar(
          radius: 30,
          backgroundColor: Colors.amber,
          child: userModel.profileImage.toString().isEmpty
              ? const SizedBox()
              : Image.network(
                  userModel.profileImage.toString(),
                ),
        ),
        title: Text(
          userModel.name.toString(),
          style: const TextStyle(
            color: Colors.black,
            fontSize: 15,
            fontFamily: 'Inter',
            fontWeight: FontWeight.w700,
            // height: 0.11,
            // letterSpacing: -0.15,
          ),
        ),
        subtitle: Text(
          userModel.email.toString(),
          style: const TextStyle(
            color: Colors.black,
            fontSize: 12,
            fontFamily: 'Inter',
            fontWeight: FontWeight.w600,
            // height: 0.08,
            // letterSpacing: -0.12,
          ),
        ),
        trailing: PopupMenuButton(
          itemBuilder: (context) => [
            const PopupMenuItem(
              child: Text('edit'),
            ),
            const PopupMenuItem(
              child: Text('delete'),
            ),
          ],
        ),
        // trailing: IconButton(
        //   onPressed: () {},
        //   icon: const Icon(
        //     Icons.more_vert,
        //   ),
        // ),
      ),
    );
  }
}
