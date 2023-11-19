import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:publisher_app/data/API/end_points.dart';
import 'package:publisher_app/models/author_model.dart';
import 'package:publisher_app/models/author_response.dart';
import 'package:publisher_app/utils/utils.dart';

class APICalls extends ChangeNotifier {
  Future<void> registerAuthor(String name, String email, String dob,
      String gender, String userID) async {
    try {
      final data = {
        'name': name,
        'email': email,
        'dob': dob,
        'gender': gender,
        'userID': userID,
      };

      Response response = await post(
        Uri.parse(url + author + route),
        body: json.encode(data),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      AuthorResponse ar =
          AuthorResponse.fromJson(json.decode(response.body.toString()));
      if (response.statusCode == 201) {
        Utils().showToast(ar.message);
      } else {
        throw ar.message.toString();
      }
    } catch (e) {
      Utils().showToast(e.toString());
    }
  }

  Future<Authors> myAuthor() async {
    try {
      Response response = await get(
        Uri.parse(url + author + route),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      Authors ar = Authors.fromJson(json.decode(response.body.toString()));
      if (response.statusCode == 200) {
        return ar;
      } else {
        throw ar.message.toString();
      }
    } catch (e) {
      Utils().showToast(e.toString());
      rethrow;
    }
  }
}
