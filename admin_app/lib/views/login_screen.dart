// ignore_for_file: use_build_context_synchronously

import 'package:admin_app/data/firebase_methods.dart';
import 'package:admin_app/res/buttons/custom_button.dart';
import 'package:admin_app/res/buttons/text_button.dart';
import 'package:admin_app/res/routes/route_name.dart';
import 'package:admin_app/res/text_field/custom_text_field.dart';
import 'package:admin_app/views/home_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../res/colors.dart';
import '../res/buttons/custom_logo_button.dart';
import '../utils/utils.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
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
                  height: size.height * 0.01,
                ),
                const Text(
                  'Login !',
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
                      width: size.width * 0.03,
                    ),
                    const Text(
                      'Or login with Email',
                      style: TextStyle(
                        color: Colors.white,
                        fontFamily: 'Inter',
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    SizedBox(
                      width: size.width * 0.03,
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
                              return 'please Enter a email';
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
                                '': _user['name'].toString(),
                                'password': v.toString(),
                                'email': _user['email'].toString(),
                              };
                            }),
                        SizedBox(
                          height: size.height * 0.027,
                        ),
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
                    text: 'Login',
                    onClick: () {
                      onSave();
                    }),
                SizedBox(
                  height: size.height * 0.02,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'Don\'t have an account?',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                        fontFamily: 'Inter',
                        fontWeight: FontWeight.w600,
                        height: 0,
                      ),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    CustomTextButton(
                      text: 'Sign up',
                      onClick: () {
                        Navigator.pushReplacementNamed(
                            context, RouteName.signup);
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
    final FirebaseAuth auth = FirebaseAuth.instance;

    if (_key.currentState!.validate()) {
      try {
        setState(() {
          isLoading = true;
        });
        _key.currentState!.save();

        await firebaseProvider.login(_user);
        Utils().showToast('Successfully Login');
        if (auth.currentUser != null) {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) => const MyHomePage(),
            ),
          );
        }
        setState(() {
          isLoading = false;
        });
      } on FirebaseAuthException catch (e) {
        Utils().showToast(e.toString());
      }
    }
  }
}

