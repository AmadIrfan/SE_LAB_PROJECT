import 'package:flutter/material.dart';

class Authors with ChangeNotifier {
  List<Data>? data;
  String? message;
  String? status;

  Authors({this.data, this.message, this.status});

  Authors.fromJson(Map<String, dynamic> json) {
    if (json['data'] != null) {
      data = <Data>[];
      json['data'].forEach((v) {
        data!.add(Data.fromJson(v));
      });
    }
    message = json['message'];
    status = json['status'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {};
    if (this.data != null) {
      data['data'] = this.data!.map((v) => v.toJson()).toList();
    }
    data['message'] = message;
    data['status'] = status;
    return data;
  }
}

class Data with ChangeNotifier {
  String? sId;
  String? name;
  String? email;
  String? gender;
  bool? active;
  String? dob;
  String? userID;
  String? createdAt;
  String? updatedAt;
  int? iV;

  Data(
      {this.sId,
      this.name,
      this.email,
      this.gender,
      this.active,
      this.dob,
      this.userID,
      this.createdAt,
      this.updatedAt,
      this.iV});

  Data.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    email = json['email'];
    gender = json['gender'];
    active = json['active'];
    dob = json['dob'];
    userID = json['userID'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {};
    data['_id'] = sId;
    data['name'] = name;
    data['email'] = email;
    data['gender'] = gender;
    data['active'] = active;
    data['dob'] = dob;
    data['userID'] = userID;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['__v'] = iV;
    return data;
  }
}
