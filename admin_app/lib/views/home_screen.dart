import 'package:admin_app/data/provider/user_provider.dart';
import 'package:admin_app/res/colors.dart';
import 'package:admin_app/res/routes/route_name.dart';
import 'package:admin_app/views/drawer.dart';
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
      'page': RouteName.userManage,
    },
    {
      'name': 'Books',
      'icon': 'assets/images/Group.svg',
      'page': RouteName.books,
    },
    {
      'name': 'Staff Member',
      'icon': 'assets/images/TdesignUsergroup.svg',
      'page': RouteName.staffManage,
    },
    {
      'name': 'Publishers',
      'icon': 'assets/images/PhUsersDuotone.svg',
      'page': RouteName.publisherManage,
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
              Navigator.pushNamed(
                context,
                _data[index]['page'].toString(),
              );
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
