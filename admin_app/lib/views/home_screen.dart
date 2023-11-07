import 'package:admin_app/data/provider/user_provider.dart';
import 'package:admin_app/views/drawer.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:provider/provider.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    UserProvider up = Provider.of<UserProvider>(context);
    up.refreshUser();
    up.getUser;
    return Scaffold(
      drawer: const MyDrawer(),
      appBar: AppBar(
        leading: const SizedBox(),
        actions: [
          Builder(
            builder: (context) => IconButton(
              onPressed: () async {
                Scaffold.of(context).openDrawer();
                // await FirebaseAuth.instance.signOut();
              },
              icon: const Icon(Icons.menu),
            ),
          ),
        ],
      ),
      body: Column(
        children: [],
      ),
    );
  }
}
