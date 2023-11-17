import 'package:admin_app/data/local%20services/local_storage.dart';
import 'package:flutter/material.dart';
import '../../models/user_model.dart';
import '../firebase_methods.dart';

class UserProvider extends ChangeNotifier {
  UserModel? _user;
  UserModel? get getUser => _user;

  Future<void> refreshUser() async {
    UserModel u = await LocalStorage().getUser();
    UserModel user = await FireBaseMethods().getUserData(u.id.toString());
    _user = user;
    notifyListeners();
  }
}
