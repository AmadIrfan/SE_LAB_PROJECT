import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

class Utils {
  void showToast(message) async {
    Fluttertoast.cancel();
    Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      // backgroundColor: ,
      textColor: Colors.white,
      fontSize: 16,
      timeInSecForIosWeb: 2,
    );
  }
}
