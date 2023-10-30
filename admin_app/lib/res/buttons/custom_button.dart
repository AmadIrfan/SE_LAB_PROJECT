import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  const CustomButton({
    super.key,
    required this.text,
    required this.onClick,
  });

  final String text;
  final Function onClick;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 60,
      padding: const EdgeInsets.symmetric(
        vertical: 2,
        horizontal: 20,
      ),
      decoration: const BoxDecoration(
        color: Colors.transparent,
      ),
      child: InkWell(
        onTap: () => onClick(),
        child: Container(
          alignment: Alignment.center,
          width: double.infinity,
          decoration: ShapeDecoration(
            color: Colors.black,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
          ),
          child: Text(
            text,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontFamily: 'Inter',
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      ),
    );
  }
}
