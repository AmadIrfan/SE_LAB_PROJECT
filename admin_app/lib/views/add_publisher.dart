import 'package:admin_app/data/firebase_methods.dart';
import 'package:admin_app/res/buttons/custom_button.dart';
import 'package:admin_app/res/colors.dart';
import 'package:admin_app/utils/utils.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../res/text_field/custom_text_field.dart';

class AddPublisher extends StatefulWidget {
  const AddPublisher({super.key});

  @override
  State<AddPublisher> createState() => _AddPublisherState();
}

class _AddPublisherState extends State<AddPublisher> {
  bool isLoading = false;
  final _key = GlobalKey<FormState>();
  final nameNode = FocusNode();
  final fNameNode = FocusNode();
  final emailNode = FocusNode();
  final passwordNode = FocusNode();
  final bioNode = FocusNode();
  final phoneNoNode = FocusNode();
  final addressNode = FocusNode();
  final btn1Node = FocusNode();
  final btn2Node = FocusNode();
  final checkNode = FocusNode();
  Map<String, String> _publisher = {
    'password': '',
    'email': '',
    'name': '',
    'fatherName': '',
    'phone': '',
    'bio': '',
    'address': '',
  };
  final TextStyle txtStyle = const TextStyle(
    fontWeight: FontWeight.w800,
  );

  @override
  void dispose() {
    addressNode.dispose();
    nameNode.dispose();
    fNameNode.dispose();
    bioNode.dispose();
    phoneNoNode.dispose();
    emailNode.dispose();
    passwordNode.dispose();
    btn2Node.dispose();
    btn1Node.dispose();
    checkNode.dispose();

    super.dispose();
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
          'New Publisher',
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
          // shrinkWrap: true,
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
                      text: 'Enter publisher name ',
                      thisNode: nameNode,
                      onSubmit: (v) {
                        FocusScope.of(context).requestFocus(fNameNode);
                      },
                      onValidate: (v) {
                        if (v!.isEmpty) {
                          return 'enter a name';
                        }
                        return null;
                      },
                      onSave: (v) {
                        _publisher = {
                          'address': _publisher['address'].toString(),
                          'name': v.toString(),
                          'password': _publisher['password'].toString(),
                          'email': _publisher['email'].toString(),
                          'fatherName': _publisher['fatherName'].toString(),
                          'phone': _publisher['phone'].toString(),
                          'bio': _publisher['bio'].toString(),
                        };
                      },
                    ),
                    SizedBox(
                      height: size.height * 0.027,
                    ),
                    CustomTextField(
                      text: 'Enter publisher Father ',
                      thisNode: fNameNode,
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
                        _publisher = {
                          'name': _publisher['name'].toString(),
                          'password': _publisher['password'].toString(),
                          'email': _publisher['email'].toString(),
                          'fatherName': v.toString(),
                          'address': _publisher['address'].toString(),
                          'phone': _publisher['phone'].toString(),
                          'bio': _publisher['bio'].toString(),
                        };
                      },
                    ),
                    SizedBox(
                      height: size.height * 0.027,
                    ),
                    CustomTextField(
                      text: 'Enter publisher Email ',
                      thisNode: emailNode,
                      textInputType: TextInputType.emailAddress,
                      onSubmit: (v) {
                        FocusScope.of(context).requestFocus(phoneNoNode);
                      },
                      onValidate: (v) {
                        if (v!.isEmpty) {
                          return 'enter An Email';
                        }
                        return null;
                      },
                      onSave: (v) {
                        _publisher = {
                          'name': _publisher['name'].toString(),
                          'password': _publisher['password'].toString(),
                          'email': v.toString(),
                          'address': _publisher['address'].toString(),
                          'fatherName': _publisher['fatherName'].toString(),
                          'phone': _publisher['phone'].toString(),
                          'bio': _publisher['bio'].toString(),
                        };
                      },
                    ),
                    SizedBox(
                      height: size.height * 0.027,
                    ),
                    CustomTextField(
                      text: 'Enter publisher phone No ',
                      thisNode: phoneNoNode,
                      textInputType: TextInputType.phone,
                      onSubmit: (v) {
                        FocusScope.of(context).requestFocus(passwordNode);
                      },
                      onValidate: (v) {
                        if (v!.isEmpty) {
                          return 'enter An Email';
                        }
                        return null;
                      },
                      onSave: (v) {
                        _publisher = {
                          'name': _publisher['name'].toString(),
                          'password': _publisher['password'].toString(),
                          'email': _publisher['email'].toString(),
                          'fatherName': _publisher['fatherName'].toString(),
                          'address': _publisher['address'].toString(),
                          'phone': v.toString(),
                          'bio': _publisher['bio'].toString(),
                        };
                      },
                    ),
                    SizedBox(
                      height: size.height * 0.027,
                    ),
                    CustomTextField(
                        text: 'Enter your Password ',
                        thisNode: passwordNode,
                        onSubmit: (v) {
                          FocusScope.of(context).requestFocus(bioNode);
                        },
                        onValidate: (v) {
                          if (v!.isEmpty) {
                            return 'enter a password';
                          }
                          return null;
                        },
                        onSave: (v) {
                          _publisher = {
                            'address': _publisher['address'].toString(),
                            'name': _publisher['name'].toString(),
                            'password': v.toString(),
                            'email': _publisher['email'].toString(),
                            'fatherName': _publisher['fatherName'].toString(),
                            'phone': _publisher['phone'].toString(),
                            'bio': _publisher['bio'].toString(),
                          };
                        }),
                    SizedBox(
                      height: size.height * 0.027,
                    ),
                    CustomTextField(
                      text: 'Enter publisher Bio ',
                      thisNode: bioNode,
                      onSubmit: (v) {
                        FocusScope.of(context).requestFocus(addressNode);
                      },
                      onValidate: (v) {
                        if (v!.isEmpty) {
                          return 'enter a bia';
                        }
                        return null;
                      },
                      onSave: (v) {
                        _publisher = {
                          'address': _publisher['address'].toString(),
                          'name': _publisher['name'].toString(),
                          'password': _publisher['password'].toString(),
                          'email': _publisher['email'].toString(),
                          'fatherName': _publisher['fatherName'].toString(),
                          'phone': _publisher['phone'].toString(),
                          'bio': v.toString(),
                        };
                      },
                    ),
                    SizedBox(
                      height: size.height * 0.027,
                    ),
                    CustomTextField(
                      text: 'Enter publisher Address ',
                      thisNode: addressNode,
                      onSubmit: (v) {
                        FocusScope.of(context).requestFocus(checkNode);
                      },
                      onValidate: (v) {
                        if (v!.isEmpty) {
                          return 'enter a address';
                        }
                        return null;
                      },
                      onSave: (v) {
                        _publisher = {
                          'name': _publisher['name'].toString(),
                          'password': _publisher['password'].toString(),
                          'email': _publisher['email'].toString(),
                          'fatherName': _publisher['fatherName'].toString(),
                          'phone': _publisher['phone'].toString(),
                          'address': v.toString(),
                          'bio': _publisher['bio'].toString(),
                        };
                      },
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
              text: 'Sign up',
              onClick: () {
                onSave();
              },
            ),
          ],
        ),
      ),
    );
  }

  void onSave() {
    if (_key.currentState!.validate()) {
      try {
        setState(() {
          isLoading = true;
        });
        _key.currentState!.save();
        Provider.of<FireBaseMethods>(context, listen: false).registerPublisher(
          _publisher['name'].toString(),
          _publisher['fatherName'].toString(),
          _publisher['email'].toString(),
          _publisher['password'].toString(),
          _publisher['phone'].toString(),
          _publisher['address'].toString(),
          _publisher['bio'].toString(),
        );
        setState(() {
          isLoading = false;
        });
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
}
