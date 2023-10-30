import 'package:admin_app/views/splash_screen.dart';
import 'package:admin_app/views/start_screen.dart';
import 'package:flutter/material.dart';

import '../routes/route_name.dart';
import '../../views/home_page.dart';

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
