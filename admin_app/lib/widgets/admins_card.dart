import 'package:admin_app/data/provider/user_provider.dart';
import 'package:admin_app/res/routes/route_name.dart';
import 'package:flutter/material.dart';
import 'package:admin_app/models/user_model.dart';
import 'package:provider/provider.dart';

class ADminCards extends StatelessWidget {
  const ADminCards({super.key, required this.userModel});
  final UserModel userModel;
  @override
  Widget build(BuildContext context) {
    UserProvider um = Provider.of<UserProvider>(context);
    um.refreshUser();
    UserModel? u = um.getUser;
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
        trailing: bool.parse(
          u!.isSuperAdmin.toString(),
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
