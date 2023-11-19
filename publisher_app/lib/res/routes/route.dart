import 'package:flutter/material.dart';
import 'package:publisher_app/view/add_author.dart';
import '../../view/authors_manage.dart';
import '../../view/forget_password.dart';
import '../../view/home_screen.dart';
import '../../view/login_screen.dart';
import '../../view/splash_screen.dart';
import '../../view/start_screen.dart';

import '../routes/route_name.dart';

class MyRoute {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case RouteName.home:
        return MaterialPageRoute(
          settings: settings,
          builder: (context) => const MyHomePage(),
        );
      case RouteName.author:
        return MaterialPageRoute(
          settings: settings,
          builder: (context) => const AuthorManage(),
        );
      case RouteName.addAuthor:
        return MaterialPageRoute(
          settings: settings,
          builder: (context) => const AddAuthor(),
        );
      case RouteName.splash:
        return MaterialPageRoute(
          settings: settings,
          builder: (context) => const SplashScreen(),
        );
      case RouteName.start:
        return MaterialPageRoute(
          settings: settings,
          builder: (context) => const StartScreen(),
        );
      case RouteName.forgetPassword:
        return MaterialPageRoute(
          settings: settings,
          builder: (context) => const ForgotPassword(),
        );
      case RouteName.login:
        return MaterialPageRoute(
          settings: settings,
          builder: (context) => const Login(),
        );
      default:
        return MaterialPageRoute(
          settings: settings,
          builder: (context) => const Scaffold(
            body: Center(
              child: Text('No Route'),
            ),
          ),
        );
    }
  }
}
