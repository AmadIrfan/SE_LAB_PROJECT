import 'package:flutter/material.dart';
import "package:provider/provider.dart";
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

import '../res/colors.dart';
import '../res/routes/route_name.dart';
import '../data/firebase_methods.dart';
import '../res/routes/route.dart';
import '../data/provider/user_provider.dart';

// import '../windows/splash_screen.dart';

// main function
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
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (context) => FireBaseMethods(),
        ),
        ChangeNotifierProvider(
          create: (context) => UserProvider(),
        ),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Managa\'s verse',
        theme: ThemeData(
          iconTheme: const IconThemeData(color: Colors.white),
          fontFamily: fontFamily,
          buttonTheme: const ButtonThemeData(
            buttonColor: darkBlueColor,
            height: 60,
          ),
          primaryColor: darkBlueColor,
          colorScheme: ColorScheme.fromSeed(
            seedColor: darkBlueColor,
          ),
          useMaterial3: true,
        ),
        initialRoute: RouteName.splash,
        onGenerateRoute: MyRoute.generateRoute,
      ),
    );
  }
}
