import 'package:flutter/material.dart';

import '../models/publisher_model.dart';


class PublisherCard extends StatelessWidget {
  const PublisherCard({super.key, required this.pModel});

  final Publisher pModel;
  @override
  Widget build(BuildContext context) {
    return Card(
      color: const Color(0xFFD9D9D9),
      child: ListTile(
        leading: CircleAvatar(
          radius: 30,
          backgroundColor: const Color(0xFFFFD88D),
          child: pModel.profileImage.toString().isEmpty
              ? const SizedBox()
              : Image.network(
                  pModel.profileImage.toString(),
                ),
        ),
        title: Text(
          pModel.name.toString(),
          style: const TextStyle(
            color: Color(0xFF171B36),
            fontSize: 20,
            height: 0,
            fontFamily: 'Inter',
            fontWeight: FontWeight.w700,
          ),
        ),
        subtitle: Text(
          pModel.email.toString(),
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
            const PopupMenuItem(
              child: Text('edit'),
            ),
            const PopupMenuItem(
              child: Text('In Active'),
            ),
          ],
        ),
      ),
    );
  }
}
