import 'package:admin_app/models/user_model.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:intl/intl.dart';

class ViewDetails extends StatefulWidget {
  const ViewDetails({super.key});

  @override
  State<ViewDetails> createState() => _ViewDetailsState();
}

class _ViewDetailsState extends State<ViewDetails> {
  @override
  Widget build(BuildContext context) {
    final ui = ModalRoute.of(context)!.settings.arguments as UserModel;

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.edit),
          ),
        ],
        title: Text(
          ui.name.toString(),
          style: const TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontFamily: 'Inter',
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Center(
          child: Column(
            children: [
              const Gap(50),
              Container(
                padding: const EdgeInsets.all(3),
                decoration: BoxDecoration(
                  border: Border.all(
                    width: 2,
                  ),
                  shape: BoxShape.circle,
                ),
                child: CircleAvatar(
                  radius: 85,
                  child: ui.profileImage!.isNotEmpty
                      ? Image.network(
                          ui.profileImage.toString(),
                        )
                      : Container(
                          decoration: const BoxDecoration(
                            color: Colors.amber,
                            shape: BoxShape.circle,
                          ),
                        ),
                ),
              ),
              CustomTile(
                title: 'Name',
                value: ui.name.toString(),
              ),
              CustomTile(
                title: 'Email',
                value: ui.email.toString(),
              ),
              CustomTile(
                title: 'Register Date',
                value: DateFormat.yMMMEd().format(ui.createDate!),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class CustomTile extends StatelessWidget {
  const CustomTile({super.key, required this.title, required this.value});
  final String title;
  final String value;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Text(
            title,
            textAlign: TextAlign.left,
            style: const TextStyle(
              color: Colors.black,
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: FontWeight.w700,
            ),
          ),
          const Gap(7),
          Container(
            alignment: Alignment.centerLeft,
            width: double.infinity,
            padding: const EdgeInsets.all(6),
            height: 45,
            decoration: ShapeDecoration(
              shape: RoundedRectangleBorder(
                side: const BorderSide(width: 2, color: Color(0x23534C4C)),
                borderRadius: BorderRadius.circular(6),
              ),
            ),
            child: Text(
              value,
              style: const TextStyle(
                color: Color(0xFF534C4C),
                fontSize: 14,
                fontFamily: 'Inter',
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
