import 'package:flutter/material.dart';

import 'package:flutter_svg/flutter_svg.dart';

import '../res/buttons/text_button.dart';
import '../res/routes/route_name.dart';
import '../res/buttons/custom_button.dart';

class StartScreen extends StatelessWidget {
  const StartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.sizeOf(context);
    return Scaffold(
      body: SafeArea(
        child: Container(
          width: double.infinity,
          decoration: const BoxDecoration(
            color: Color(0xFF171B36),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                alignment: Alignment.topLeft,
                padding: const EdgeInsets.fromLTRB(
                  19,
                  20,
                  0,
                  0,
                ),
                width: 264,
                child: const Text(
                  "Welcome To Managa's Verse",
                  textAlign: TextAlign.start,
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                    fontSize: 40,
                    fontFamily: 'Inter',
                    height: 0,
                  ),
                ),
              ),
              const Padding(
                padding: EdgeInsets.fromLTRB(19, 10, 0, 0),
                child: Text(
                  'A world of Novels',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                    fontSize: 20,
                    fontFamily: 'Inter',
                    // fontWeight: FontWeight.w734,
                    height: 0,
                  ),
                ),
              ),
              SizedBox(
                height: size.height * 0.07,
              ),
              Expanded(
                child: Stack(
                  children: [
                    Positioned(
                      // top: 50,
                      child: Container(
                        alignment: Alignment.topLeft,
                        child: SvgPicture.asset(
                          'assets/images/Group33.svg',
                        ),
                      ),
                    ),
                    Positioned(
                      top: 130,
                      right: 0,
                      child: SvgPicture.asset(
                        'assets/images/Group877.svg',
                      ),
                    ),
                  ],
                ),
              ),
              CustomButton(
                  text: 'Sign up',
                  onClick: () {
                    Navigator.pushNamed(
                      context,
                      RouteName.signup,
                    );
                  }),
              const SizedBox(
                height: 10,
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
                      Navigator.pushReplacementNamed(context, RouteName.login);
                    },
                  ),
                ],
              ),
              SizedBox(
                height: size.height * 0.07,
              )
            ],
          ),
        ),
      ),
    );
  }
}
