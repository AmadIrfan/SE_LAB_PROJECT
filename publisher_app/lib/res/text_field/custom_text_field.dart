import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  const CustomTextField({
    super.key,
    required this.text,
    required this.thisNode,
    required this.onSubmit,
    required this.onValidate,
    required this.onSave,
    this.textInputType = TextInputType.text,
    this.textInputAction = TextInputAction.next,
    this.init,
  });
// 'Enter your name '
  final String text;
  final String? init;

  final FocusNode thisNode;
  final Function(String?)? onSave;
  final TextInputType? textInputType;
  final TextInputAction? textInputAction;
  final Function(String) onSubmit;
  final String? Function(String?)? onValidate;
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      initialValue: init,
      focusNode: thisNode,
      textInputAction: textInputAction,
      keyboardType: textInputType,
      decoration: InputDecoration(
        filled: true,
        fillColor: Colors.white,
        hintText: text,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 15,
          vertical: 10,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(50),
        ),
      ),
      onFieldSubmitted: onSubmit,
      validator: onValidate,
      onSaved: onSave,
    );
  }
}
