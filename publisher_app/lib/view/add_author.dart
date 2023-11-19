import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:publisher_app/data/API/api_calls.dart';
import 'package:publisher_app/data/provider/user_provider.dart';
import 'package:publisher_app/models/author_model.dart' as am;

import '../models/author_response.dart';
import '../res/buttons/custom_button.dart';
import '../res/colors.dart';
import '../utils/utils.dart';
import '../res/text_field/custom_text_field.dart';

class AddAuthor extends StatefulWidget {
  const AddAuthor({super.key});

  @override
  State<AddAuthor> createState() => _AddAuthorState();
}

class _AddAuthorState extends State<AddAuthor> {
  bool isLoading = false;
  final _key = GlobalKey<FormState>();
  final nameNode = FocusNode();
  final emailNode = FocusNode();
  final dobNode = FocusNode();
  final genderNode = FocusNode();
  final btn1Node = FocusNode();
  final btn2Node = FocusNode();
  final checkNode = FocusNode();
  am.Data? _au = am.Data();
  Map<String, String> _author = {
    'name': '',
    'email': '',
    'dob': '',
    'gender': '',
  };
  final TextStyle txtStyle = const TextStyle(
    fontWeight: FontWeight.w800,
  );
  bool init = true;
  @override
  void dispose() {
    nameNode.dispose();
    dobNode.dispose();
    genderNode.dispose();
    emailNode.dispose();
    btn2Node.dispose();
    btn1Node.dispose();
    checkNode.dispose();

    super.dispose();
  }

  @override
  void didChangeDependencies() {
    if (init) {
      _au = ModalRoute.of(context)!.settings.arguments as am.Data?;
      if (_au != null) {
        _author = {
          'name': _au!.name.toString(),
          'email': _au!.email.toString(),
          'dob': _au!.dob.toString(),
          'gender': _au!.gender.toString(),
        };
      }
      // Provider.of<Data>(context);
      init = false;
    }
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.sizeOf(context);
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: darkBlueColor,
      appBar: AppBar(
        iconTheme: Theme.of(context).iconTheme,
        backgroundColor: darkBlueColor,
        centerTitle: true,
        title: const Text(
          'Add New Author',
          style: TextStyle(
            color: Colors.white,
            fontSize: 30,
            fontFamily: 'Inter',
            fontWeight: FontWeight.w700,
            height: 0,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: size.height * 0.03,
            ),
            Form(
              key: _key,
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 40,
                  vertical: 20,
                ),
                child: Column(
                  children: [
                    CustomTextField(
                      init: _author['name'].toString(),
                      text: 'Enter publisher name ',
                      thisNode: nameNode,
                      onSubmit: (v) {
                        FocusScope.of(context).requestFocus(emailNode);
                      },
                      onValidate: (v) {
                        if (v!.isEmpty) {
                          return 'enter a name';
                        }
                        return null;
                      },
                      onSave: (v) {
                        _author = {
                          'name': v.toString(),
                          'email': _author['email'].toString(),
                          'dob': _author['dob'].toString(),
                          'gender': _author['gender'].toString(),
                        };
                      },
                    ),
                    SizedBox(
                      height: size.height * 0.027,
                    ),
                    CustomTextField(
                      init: _author['email'].toString(),
                      text: 'Enter publisher Email ',
                      thisNode: emailNode,
                      textInputType: TextInputType.emailAddress,
                      onSubmit: (v) {
                        FocusScope.of(context).requestFocus();
                      },
                      onValidate: (v) {
                        if (v!.isEmpty) {
                          return 'enter An Email';
                        }
                        return null;
                      },
                      onSave: (v) {
                        _author = {
                          'name': _author['name'].toString(),
                          'email': v.toString(),
                          'dob': _author['dob'].toString(),
                          'gender': _author['gender'].toString(),
                        };
                      },
                    ),
                    SizedBox(
                      height: size.height * 0.027,
                    ),
                    const Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Text(
                          'Gender : ',
                          textAlign: TextAlign.left,
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w800,
                            fontSize: 20,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(
                      height: 70,
                      child: Row(
                        children: [
                          Expanded(
                            child: InkWell(
                              onTap: () {
                                setState(() {});
                                _author = {
                                  'name': _author['name'].toString(),
                                  'email': _author['email'].toString(),
                                  'dob': _author['dob'].toString(),
                                  'gender': 'male',
                                };
                              },
                              child: Container(
                                alignment: Alignment.center,
                                width: double.infinity,
                                height: 40,
                                margin: const EdgeInsets.all(5),
                                decoration: BoxDecoration(
                                  color: _author['gender'] == 'male'
                                      ? Colors.black
                                      : Colors.black.withOpacity(0.3),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: const Text(
                                  'Male',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w800,
                                    fontSize: 16,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          Expanded(
                            child: InkWell(
                              onTap: () {
                                setState(() {});
                                _author = {
                                  'name': _author['name'].toString(),
                                  'email': _author['email'].toString(),
                                  'dob': _author['dob'].toString(),
                                  'gender': 'female',
                                };
                              },
                              child: Container(
                                decoration: BoxDecoration(
                                  color: _author['gender'] == 'female'
                                      ? Colors.black
                                      : Colors.black.withOpacity(0.3),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                alignment: Alignment.center,
                                margin: const EdgeInsets.all(5),
                                width: double.infinity,
                                height: 40,
                                child: const Text(
                                  'Female',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w800,
                                    fontSize: 16,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: size.height * 0.027,
                    ),
                    const Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Text(
                          'Date of Birth : ',
                          textAlign: TextAlign.left,
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w800,
                            fontSize: 20,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(50),
                        color: Colors.white,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(_author['dob'] == ''
                              ? 'No date selected'
                              : DateFormat.yMMMEd().format(
                                  DateTime.parse(_author['dob'].toString()))),
                          IconButton(
                            onPressed: () async {
                              DateTime? d = await showDatePicker(
                                  context: context,
                                  initialDate: DateTime.now(),
                                  firstDate: DateTime(2000),
                                  lastDate: DateTime(2100));
                              if (d != null) {
                                setState(() {
                                  _author = {
                                    'name': _author['name'].toString(),
                                    'email': _author['email'].toString(),
                                    'dob': d.toString(),
                                    'gender': _author['gender'].toString(),
                                  };
                                });
                              }
                            },
                            icon: const Icon(
                              Icons.calendar_month_outlined,
                              color: darkBlueColor,
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: size.height * 0.027,
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(
              height: size.height * 0.05,
            ),
            CustomButton(
              isLoading: isLoading,
              focusNode: btn2Node,
              text: _au == null ? 'Save' : 'Update',
              onClick: () {
                onSave();
              },
            ),
          ],
        ),
      ),
    );
  }

  void onSave() async {
    UserProvider up = Provider.of<UserProvider>(context, listen: false);
    up.refreshUser();
    try {
      if (_key.currentState!.validate()) {
        if (_author['gender'] == '') {
          Utils().showToast('Gender is not selected');
          return;
        } else if (_author['dob'] == '') {
          Utils().showToast('Date of Birth is not selected');
          return;
        } else {
          setState(() {
            isLoading = true;
          });

          _key.currentState!.save();
          if (_au == null) {
            await Provider.of<APICalls>(context, listen: false).registerAuthor(
              _author['name'].toString(),
              _author['email'].toString(),
              _author['dob'].toString(),
              _author['gender'].toString(),
              up.getPublisher!.id.toString(),
            );
          } else {
            AuthorResponse ar =
                await Provider.of<APICalls>(context, listen: false)
                    .updateAuthor(
              _author['name'].toString(),
              _author['email'].toString(),
              _author['dob'].toString(),
              _author['gender'].toString(),
              up.getPublisher!.id.toString(),
              _au!.active!,
              _au!.sId!,
            );
            Utils().showToast(ar.message.toString());
          }
          setState(() {
            isLoading = false;
          });
        }
      }
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      Utils().showToast(
        e.toString(),
      );
    }
  }
}
