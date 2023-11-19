import 'package:flutter/material.dart';

class AuthorResponse {
  Data? data;
  String? message;
  String? status;

  AuthorResponse({this.data, this.message, this.status});

  AuthorResponse.fromJson(Map<String, dynamic> json) {
    data = json['data'] != null ? Data.fromJson(json['data']) : null;
    message = json['message'];
    status = json['status'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {};
    if (this.data != null) {
      data['data'] = this.data!.toJson();
    }
    data['message'] = message;
    data['status'] = status;
    return data;
  }
}

class Data extends ChangeNotifier {
  String? name;
  String? email;
  String? gender;
  bool? active;
  String? dob;
  String? userID;
  String? sId;
  String? createdAt;
  String? updatedAt;
  int? iV;

  Data(
      {this.name,
      this.email,
      this.gender,
      this.active,
      this.dob,
      this.userID,
      this.sId,
      this.createdAt,
      this.updatedAt,
      this.iV});

  Data.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    email = json['email'];
    gender = json['gender'];
    active = json['active'];
    dob = json['dob'];
    userID = json['userID'];
    sId = json['_id'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {};
    data['name'] = name;
    data['email'] = email;
    data['gender'] = gender;
    data['active'] = active;
    data['dob'] = dob;
    data['userID'] = userID;
    data['_id'] = sId;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['__v'] = iV;
    return data;
  }
}
