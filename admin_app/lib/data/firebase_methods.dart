import 'package:admin_app/models/user_model.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import 'package:firebase_auth/firebase_auth.dart';

class FireBaseMethods with ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  Future<void> signup(String name, String password, String email) async {
    try {
      UserCredential userData = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      UserModel u = UserModel(
        id: userData.user!.uid,
        name: name,
        email: email,
        role: 'admin',
        profileImage: '',
        phone: '',
        createDate: DateTime.now(),
        updateDate: DateTime.now(),
      );
      await _firestore.collection('admin').doc(userData.user!.uid).set(
            u.toMap(),
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
