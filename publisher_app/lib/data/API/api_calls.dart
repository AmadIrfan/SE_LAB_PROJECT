import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:publisher_app/data/API/end_points.dart';
import 'package:publisher_app/models/author_model.dart' as am;
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
        Uri.parse('$url$author$route'),
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

  Future<AuthorResponse> updateAuthor(String name, String email, String dob,
      String gender, String userID, bool active, String sId) async {
    try {
      final data = {
        'name': name,
        'email': email,
        'dob': dob,
        'gender': gender,
        'userID': userID,
        'active': active
      };
      Response response = await put(
        Uri.parse('$url$author$route$sId'),
        body: json.encode(data),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      AuthorResponse ar =
          AuthorResponse.fromJson(json.decode(response.body.toString()));
      return ar;
    } catch (e) {
      rethrow;
    }
  }

  Future<AuthorResponse> deleteAuthor(String sId) async {
    try {
      Response response = await delete(
        Uri.parse('$url$author$route$sId'),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      AuthorResponse ar =
          AuthorResponse.fromJson(json.decode(response.body.toString()));
      return ar;
    } catch (e) {
      rethrow;
    }
  }

  Future<am.Authors> myAuthor(String query) async {
    try {
      Response response = await get(
        Uri.parse('$url$author$route?$query'),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      am.Authors ar =
          am.Authors.fromJson(json.decode(response.body.toString()));
      if (response.statusCode == 200) {
        return ar;
      } else {
        throw ar.message.toString();
      }
    } catch (e) {
      rethrow;
    }
  }

  Future<AuthorResponse> authorStatusChange(bool active, String id) async {
    try {
      Response response = await put(Uri.parse('$url$author${route}active/$id'),
          headers: {
            'Content-Type': 'application/json',
          },
          body: json.encode({'active': active}));
      AuthorResponse ar =
          AuthorResponse.fromJson(json.decode(response.body.toString()));
      return ar;
    } catch (e) {
      rethrow;
    }
  }
}
