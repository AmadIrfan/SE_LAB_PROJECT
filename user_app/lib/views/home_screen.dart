import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:user_app/views/drawer.dart';

import '../data/provider/user_provider.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    UserProvider userProvider = Provider.of<UserProvider>(
      context,
    );
    userProvider.refreshUser();
    return Scaffold(
      drawer: const MyDrawer(),
      appBar: AppBar(
        leading: const SizedBox(),
        actions: [
          Builder(
            builder: (context) => IconButton(
              onPressed: () async {
                // await FirebaseAuth.instance.signOut();
                Scaffold.of(context).openDrawer();
              },
              icon: const Icon(Icons.menu),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          Text(
            userProvider.getUser!.updateDate!.toString(),
          ),
        ],
      ),
    );
  }
}
