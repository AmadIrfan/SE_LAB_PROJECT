// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:flutter/material.dart';

class Publisher with ChangeNotifier {
  String? id;
  String? password;
  String? email;
  String? name;
  String? fatherName;
  String? phone;
  String? profileImage;
  String? gender;
  String? address;
  String? bio;
  bool? active;
  DateTime? createDate;
  DateTime? updateDate;
  Publisher({
    required this.id,
    required this.password,
    required this.email,
    required this.name,
    required this.fatherName,
    required this.phone,
    required this.profileImage,
    required this.gender,
    required this.address,
    required this.bio,
    this.active = true,
    this.createDate,
    this.updateDate,
  });

  Publisher copyWith({
    String? id,
    String? password,
    String? email,
    String? name,
    String? fatherName,
    String? phone,
    String? profileImage,
    String? gender,
    String? address,
    String? bio,
    bool? active,
    DateTime? createDate,
    DateTime? updateDate,
  }) {
    return Publisher(
      id: id ?? this.id,
      password: password ?? this.password,
      email: email ?? this.email,
      name: name ?? this.name,
      fatherName: fatherName ?? this.fatherName,
      phone: phone ?? this.phone,
      profileImage: profileImage ?? this.profileImage,
      gender: gender ?? this.gender,
      address: address ?? this.address,
      bio: bio ?? this.bio,
      active: active ?? this.active,
      createDate: createDate ?? this.createDate,
      updateDate: updateDate ?? this.updateDate,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'password': password,
      'email': email,
      'name': name,
      'fatherName': fatherName,
      'phone': phone,
      'profileImage': profileImage,
      'gender': gender,
      'address': address,
      'bio': bio,
      'active': active,
      'createDate': createDate?.toString(),
      'updateDate': updateDate?.toString(),
    };
  }

  factory Publisher.fromMap(Map<String, dynamic> map) {
    return Publisher(
      id: map['id'] != null ? map['id'] as String : null,
      password: map['password'] != null ? map['password'] as String : null,
      email: map['email'] != null ? map['email'] as String : null,
      name: map['name'] != null ? map['name'] as String : null,
      fatherName:
          map['fatherName'] != null ? map['fatherName'] as String : null,
      phone: map['phone'] != null ? map['phone'] as String : null,
      profileImage:
          map['profileImage'] != null ? map['profileImage'] as String : null,
      gender: map['gender'] != null ? map['gender'] as String : null,
      address: map['address'] != null ? map['address'] as String : null,
      bio: map['bio'] != null ? map['bio'] as String : null,
      active: map['active'] != null ? map['active'] as bool : null,
      createDate: map['createDate'] != null
          ? DateTime.parse(map['createDate'] as String)
          : null,
      updateDate: map['updateDate'] != null
          ? DateTime.parse(map['updateDate'] as String)
          : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory Publisher.fromJson(String source) =>
      Publisher.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'Publisher(id: $id, password: $password, email: $email, name: $name, fatherName: $fatherName, phone: $phone, profileImage: $profileImage, gender: $gender, address: $address, bio: $bio, active: $active, createDate: $createDate, updateDate: $updateDate)';
  }
}
