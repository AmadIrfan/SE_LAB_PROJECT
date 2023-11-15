import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

// ignore_for_file: public_member_api_docs, sort_constructors_first
class UserModel with ChangeNotifier {
  String? id;
  String? name;
  String? email;
  bool? isSuperAdmin;
  DateTime? createDate;
  DateTime? updateDate;
  String? profileImage;
  String? phone;
  String role;
  bool? active;
  UserModel({
    this.id,
    this.name,
    this.email,
    this.isSuperAdmin = false,
    required this.createDate,
    required this.updateDate,
    this.profileImage,
    this.phone,
    required this.role,
    this.active = true,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'name': name,
      'email': email,
      'isSuperAdmin': isSuperAdmin,
      'createDate': DateTime.now(),
      'updateDate': DateTime.now(),
      'profileImage': profileImage,
      'phone': phone,
      'role': role,
      'active': active,
    };
  }

  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      id: map['id'] != null ? map['id'] as String : null,
      name: map['name'] != null ? map['name'] as String : null,
      email: map['email'] != null ? map['email'] as String : null,
      isSuperAdmin:
          map['isSuperAdmin'] != null ? map['isSuperAdmin'] as bool : null,
      createDate: map['createDate'] != null
          ? (map['createDate'] as Timestamp).toDate()
          : DateTime.now(),
      updateDate: map['updateDate'] != null
          ? (map['updateDate'] as Timestamp).toDate()
          : DateTime.now(),
      profileImage:
          map['profileImage'] != null ? map['profileImage'] as String : null,
      phone: map['phone'] != null ? map['phone'] as String : null,
      role: map['role'] as String,
      active: map['active'] != null ? map['active'] as bool : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory UserModel.fromJson(String source) =>
      UserModel.fromMap(json.decode(source) as Map<String, dynamic>);
}
