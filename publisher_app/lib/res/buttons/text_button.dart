import 'package:flutter/material.dart';

class CustomTextButton extends StatelessWidget {
  const CustomTextButton(
      {super.key, required this.text, required this.onClick});
  final String text;
  final Function onClick;
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => onClick(),
      child: Text(
        text,
        style: const TextStyle(
          color: Colors.black,
          fontSize: 20,
          fontFamily: 'Inter',
          fontWeight: FontWeight.w700,
          height: 0,
        ),
      ),
    );
  }
}
