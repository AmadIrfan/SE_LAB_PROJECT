import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../data/firebase_methods.dart';
import '../res/buttons/custom_button.dart';
import '../res/colors.dart';
import '../res/text_field/custom_text_field.dart';
import '../utils/utils.dart';

class ForgotPassword extends StatefulWidget {
  const ForgotPassword({super.key});

  @override
  State<ForgotPassword> createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {
  bool isLoading = false;
  final _key = GlobalKey<FormState>();
  final emailNode = FocusNode();
  final btn1Node = FocusNode();
  String email = '';

  final TextStyle txtStyle = const TextStyle(
    fontWeight: FontWeight.w800,
  );

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
                  'Forgot Password !',
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
                              FocusScope.of(context).requestFocus(btn1Node);
                            },
                            onValidate: (v) {
                              if (v!.isEmpty) {
                                return 'please Enter a email';
                              }
                              return null;
                            },
                            onSave: (v) {
                              email = v.toString();
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
                    focusNode: btn1Node,
                    text: 'Send Email',
                    onClick: () {
                      onSave();
                    }),
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

        await firebaseProvider.forgotPassword(email);
        Utils().showToast(
            'Successfully Sent Password reset link to your email $email');
        if (auth.currentUser != null) {}
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
