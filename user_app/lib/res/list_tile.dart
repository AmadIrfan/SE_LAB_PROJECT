import 'package:flutter/material.dart';
import 'package:user_app/res/colors.dart';

class AppListTile extends StatelessWidget {
  const AppListTile({super.key, required this.title});
  final String title;
  @override
  Widget build(BuildContext context) {
    return Card(
      color: darkBlueColor,
      elevation: 0,
      margin: const EdgeInsets.only(
        left: 15,
        right: 20,
        top: 5,
        bottom: 5,
      ),
      child: ListTile(
        title: Text(
          title,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontFamily: 'Inter',
            fontWeight: FontWeight.w700,
            height: 0.11,
            letterSpacing: -0.15,
          ),
        ),
      ),
    );
  }
}
