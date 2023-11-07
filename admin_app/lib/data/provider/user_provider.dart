import 'package:flutter/material.dart';
import '../../models/user_model.dart';
import '../firebase_methods.dart';

class UserProvider extends ChangeNotifier {
  UserModel? _user;
  UserModel? get getUser => _user;

  Future<void> refreshUser() async {
    UserModel user = await FireBaseMethods().getUserData();
    _user = user;
    notifyListeners();
  }
}
