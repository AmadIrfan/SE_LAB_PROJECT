import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class Utils {
  void showToast(message) async {
    FToast().showToast(
      child: Text(
        message,
      ),
    );
  }
}
