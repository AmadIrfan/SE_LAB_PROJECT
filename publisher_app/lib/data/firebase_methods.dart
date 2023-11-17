import 'package:flutter/material.dart';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class FireBaseMethods with ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

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

  Future<void> getUserData() async {}
}
