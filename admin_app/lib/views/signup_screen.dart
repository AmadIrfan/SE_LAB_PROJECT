import 'package:admin_app/data/firebase_methods.dart';
import 'package:admin_app/res/buttons/custom_button.dart';
import 'package:admin_app/res/buttons/text_button.dart';
import 'package:admin_app/res/routes/route_name.dart';
import 'package:admin_app/res/text_field/custom_text_field.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../res/colors.dart';
import '../res/buttons/custom_logo_button.dart';
import '../utils/utils.dart';

class Signup extends StatefulWidget {
  const Signup({super.key});

  @override
  State<Signup> createState() => _SignupState();
}

class _SignupState extends State<Signup> {
  bool isLoading = false;
  final _key = GlobalKey<FormState>();
  final nameNode = FocusNode();
  final emailNode = FocusNode();
  final passwordNode = FocusNode();
  final btn1Node = FocusNode();
  final btn2Node = FocusNode();
  final checkNode = FocusNode();
  Map<String, String> _user = {
    'password': '',
    'email': '',
    'name': '',
  };
  final TextStyle txtStyle = const TextStyle(
    fontWeight: FontWeight.w800,
  );

  @override
  void dispose() {
    nameNode.dispose();
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
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              // shrinkWrap: true,
              children: [
                SizedBox(
                  height: size.height * 0.1,
                ),
                const Text(
                  'Sign up !',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 30,
                    fontFamily: 'Inter',
                    fontWeight: FontWeight.w700,
                    height: 0,
                  ),
                ),
                SizedBox(
                  height: size.height * 0.03,
                ),
                CustomLogoButton(
                  logo: const Image(
                    image: AssetImage('assets/images/google.png'),
                  ),
                  text: 'Sign up with Google',
                  onClick: () {},
                ),
                SizedBox(
                  height: size.height * 0.03,
                ),
                Row(
                  children: [
                    SizedBox(
                      width: size.width * 0.05,
                    ),
                    const Expanded(
                      child: Divider(
                        thickness: 2,
                        color: Colors.white,
                        height: 1,
                      ),
                    ),
                    SizedBox(
                      width: size.width * 0.02,
                    ),
                    const Text(
                      'Or continue with Email',
                      style: TextStyle(
                        color: Colors.white,
                        fontFamily: 'Inter',
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    SizedBox(
                      width: size.width * 0.02,
                    ),
                    const Expanded(
                      child: Divider(
                        thickness: 2,
                        color: Colors.white,
                        height: 1,
                      ),
                    ),
                    SizedBox(
                      width: size.width * 0.05,
                    ),
                  ],
                ),
                SizedBox(
                  height: size.height * 0.027,
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
                          text: 'Enter your name ',
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
                            _user = {
                              'name': v.toString(),
                              'password': _user['password'].toString(),
                              'email': _user['email'].toString(),
                            };
                          },
                        ),
                        SizedBox(
                          height: size.height * 0.027,
                        ),
                        CustomTextField(
                          text: 'Enter your Email ',
                          thisNode: emailNode,
                          onSubmit: (v) {
                            FocusScope.of(context).requestFocus(passwordNode);
                          },
                          onValidate: (v) {
                            if (v!.isEmpty) {
                              return 'enter a email';
                            }
                            return null;
                          },
                          onSave: (v) {
                            _user = {
                              'name': _user['name'].toString(),
                              'email': v.toString(),
                              'password': _user['password'].toString(),
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
                              FocusScope.of(context).requestFocus(checkNode);
                            },
                            onValidate: (v) {
                              if (v!.isEmpty) {
                                return 'enter a password';
                              }
                              return null;
                            },
                            onSave: (v) {
                              _user = {
                                'name': _user['name'].toString(),
                                'password': v.toString(),
                                'email': _user['email'].toString(),
                              };
                            }),
                        SizedBox(
                          height: size.height * 0.027,
                        ),
                        Row(
                          children: [
                            Transform.scale(
                              scale: 1.2,
                              child: Checkbox(
                                value: true,
                                onChanged: (v) {},
                                focusNode: checkNode,
                              ),
                            ),
                            const Text(
                              'I agree with the Terms of Service and \n Privacy policy',
                              softWrap: true,
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                fontSize: 14,
                                color: Colors.white,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        )
                      ],
                    ),
                  ),
                ),
                SizedBox(
                  height: size.height * 0.13,
                ),
                CustomButton(
                    isLoading: isLoading,
                    focusNode: btn2Node,
                    text: 'Sign up',
                    onClick: () {
                      onSave();
                    }),
                SizedBox(
                  height: size.height * 0.005,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'Already have an account?',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                        fontFamily: 'Inter',
                        fontWeight: FontWeight.w700,
                        height: 0,
                      ),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    CustomTextButton(
                      text: 'Login',
                      onClick: () {
                        Navigator.pushNamed(context, RouteName.login);
                      },
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void onSave() async {
    final firebaseProvider =
        Provider.of<FireBaseMethods>(context, listen: false);
    if (_key.currentState!.validate()) {
      try {
        setState(() {
          isLoading = true;
        });
        _key.currentState!.save();
        await firebaseProvider.signup(
            _user['name'].toString(), _user['password']!, _user['email']!);
        Utils().showToast('Successfully register');
        setState(() {
          isLoading = false;
        });
      } on FirebaseAuthException catch (e) {
        Utils().showToast(e.toString());
        setState(() {
          isLoading = false;
        });
      }
    }
  }
}
