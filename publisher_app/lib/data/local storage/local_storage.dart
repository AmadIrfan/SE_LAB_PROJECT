import 'package:flutter/material.dart';
import 'package:publisher_app/models/publisher_model.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LocalStorage with ChangeNotifier {
  Future<bool> setUser(Publisher publisher) async {
    SharedPreferences sp = await SharedPreferences.getInstance();
    bool? res = await sp.setString('publisher', publisher.toJson());
    return res;
  }

  Future<Publisher> getUser() async {
    SharedPreferences sp = await SharedPreferences.getInstance();
    String? res = sp.getString('publisher');
    return Publisher.fromJson(res!);
  }
}
