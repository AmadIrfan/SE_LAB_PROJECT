import 'package:flutter/material.dart';
import 'package:user_app/data/firebase_methods.dart';
import 'package:user_app/models/user_model.dart';

class UserProvider extends ChangeNotifier {
  UserModel? _user;
  UserModel? get getUser => _user;

  Future<void> refreshUser() async {
    UserModel user = await FireBaseMethods().getUserData();
    _user = user;
    notifyListeners();
  }
}
