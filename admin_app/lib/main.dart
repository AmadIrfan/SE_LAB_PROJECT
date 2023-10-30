import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

// ...

import '../res/routes/route_name.dart';
import 'res/routes/route.dart';
// import '../windows/splash_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        fontFamily: 'Inter',
        buttonTheme: const ButtonThemeData(
          buttonColor: Color(0xFF171B36),
          height: 60,
        ),
        primaryColor: const Color(0xFF171B36),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF171B36),
        ),
        useMaterial3: true,
      ),
      initialRoute: RouteName.splash,
      onGenerateRoute: MyRoute.generateRoute,
    );
  }
}
