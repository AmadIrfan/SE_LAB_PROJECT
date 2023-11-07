import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  const CustomButton({
    super.key,
    required this.text,
    required this.onClick,
    this.focusNode,
    this.isLoading = false,
  });

  final String text;
  final bool isLoading;
  final FocusNode? focusNode;
  final Function onClick;
  @override
  Widget build(BuildContext context) {
    // print(isLoading);
    return Container(
      width: double.infinity,
      height: 57,
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
          child: isLoading
              ? const Center(
                  child: CircularProgressIndicator(),
                )
              : Text(
                  text,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontFamily: 'Inter',
                    fontWeight: FontWeight.w600,
                  ),
                ),
        ),
      ),
    );
  }
}
