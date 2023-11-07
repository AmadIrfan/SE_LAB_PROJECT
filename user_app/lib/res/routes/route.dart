import '/views/login_screen.dart';
import '/views/signup_screen.dart';
import '/views/splash_screen.dart';
import '/views/start_screen.dart';
import 'package:flutter/material.dart';

import '../routes/route_name.dart';
import '../../views/home_screen.dart';

class MyRoute {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case RouteName.home:
        return MaterialPageRoute(
          builder: (context) => const MyHomePage(),
        );
      case RouteName.splash:
        return MaterialPageRoute(
          builder: (context) => const SplashScreen(),
        );
      case RouteName.start:
        return MaterialPageRoute(
          builder: (context) => const StartScreen(),
        );
      case RouteName.signup:
        return MaterialPageRoute(
          builder: (context) => const Signup(),
        );
      case RouteName.login:
        return MaterialPageRoute(
          builder: (context) => const Login(),
        );

      default:
        return MaterialPageRoute(
          builder: (context) => const Scaffold(
            body: Center(
              child: Text('No Route'),
            ),
          ),
        );
    }
  }
}
