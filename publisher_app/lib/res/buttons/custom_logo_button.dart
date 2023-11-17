import 'package:flutter/material.dart';

class CustomLogoButton extends StatelessWidget {
  const CustomLogoButton({
    super.key,
    required this.logo,
    required this.text,
    this.focusNode,
    required this.onClick,
  });
  final Widget logo;
  final String text;
  final Function onClick;
  final FocusNode? focusNode;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 55,
      alignment: Alignment.center,
      padding: const EdgeInsets.symmetric(
        vertical: 2,
        horizontal: 20,
      ),
      decoration: const BoxDecoration(
        color: Colors.transparent,
      ),
      child: InkWell(
        focusNode: focusNode,
        mouseCursor: SystemMouseCursors.click,
        onTap: () => onClick(),
        child: Container(
          alignment: Alignment.center,
          width: double.infinity,
          decoration: ShapeDecoration(
            color: Colors.black,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(25),
            ),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              logo,
              const SizedBox(
                width: 5,
              ),
              Text(
                text,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontFamily: 'Inter',
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
