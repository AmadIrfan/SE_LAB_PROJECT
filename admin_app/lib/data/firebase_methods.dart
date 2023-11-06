import 'package:flutter/material.dart';

import 'package:firebase_auth/firebase_auth.dart';

class FireBaseMethods with ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  Future<void> signup(Map<String, String> user) async {
    try {
      await _auth.createUserWithEmailAndPassword(
        email: user['email']!,
        password: user['password']!,
      );
    } catch (e) {
      rethrow;
    }
  }

  Future<void> login(Map<String, String> user) async {
    try {
      await _auth.signInWithEmailAndPassword(
        email: user['email']!,
        password: user['password']!,
      );
    } catch (e) {
      rethrow;
    }
  }
}
