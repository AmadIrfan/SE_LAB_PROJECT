// ignore_for_file: deprecated_member_use

import '../data/provider/user_provider.dart';
import '../res/colors.dart';
import 'drawer.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:gap/gap.dart';
import 'package:provider/provider.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final List<Map<String, String>> _data = [
    {
      'name': 'User',
      'icon': 'assets/images/PhUsersDuotone.svg',
      'page': '',
    },
    {
      'name': 'Books',
      'icon': 'assets/images/Group.svg',
      'page': '',
    },
    {
      'name': 'Staff Member',
      'icon': 'assets/images/TdesignUsergroup.svg',
      'page': '',
    },
    {
      'name': 'Publishers',
      'icon': 'assets/images/PhUsersDuotone.svg',
      'page': '',
    },
  ];

  @override
  Widget build(BuildContext context) {
    UserProvider up = Provider.of<UserProvider>(context, listen: false);
    up.refreshUser();

    return Scaffold(
      drawer: const MyDrawer(),
      appBar: AppBar(
        leading: const SizedBox(),
        title: const Text('Dashboard'),
        centerTitle: true,
        actions: [
          Builder(
            builder: (context) => IconButton(
              onPressed: () async {
                Scaffold.of(context).openDrawer();
              },
              icon: const Icon(Icons.menu),
            ),
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: _data.length,
        itemBuilder: (context, index) {
          return InkWell(
            onTap: () {
              // Navigator.pushNamed(
              //   context,
              //   _data[index]['page'].toString(),
              // );
            },
            child: Container(
              height: 200,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: darkBlueColor,
              ),
              margin: const EdgeInsets.all(5),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    alignment: Alignment.center,
                    width: 120,
                    height: 120,
                    decoration: const BoxDecoration(),
                    child: SvgPicture.asset(
                      _data[index]['icon'].toString(),
                      height: 100,
                      width: 100,
                      color: Colors.white,
                      // fit: BoxFit.fill,
                    ),
                  ),
                  const Gap(5),
                  Text(
                    _data[index]['name'].toString(),
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
