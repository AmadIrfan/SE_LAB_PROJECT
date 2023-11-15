import 'package:admin_app/res/routes/route_name.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:gap/gap.dart';

import '../res/colors.dart';
import '../res/list_tile.dart';
import '../data/provider/user_provider.dart';

class MyDrawer extends StatefulWidget {
  const MyDrawer({super.key});

  @override
  State<MyDrawer> createState() => _MyDrawerState();
}

class _MyDrawerState extends State<MyDrawer> {
  int index = 0;
  @override
  Widget build(BuildContext context) {
    UserProvider userProvider = Provider.of<UserProvider>(
      context,
    );
    return SafeArea(
      child: Drawer(
        width: double.infinity,
        backgroundColor: darkBlueColor,
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Gap(20),
              ListTile(
                leading: CircleAvatar(
                  radius: 30,
                  backgroundColor: Colors.amber,
                  child: userProvider.getUser!.profileImage.toString().isEmpty
                      ? const SizedBox()
                      : Image.network(
                          userProvider.getUser!.profileImage.toString(),
                        ),
                ),
                title: Text(
                  userProvider.getUser!.name.toString(),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 15,
                    fontFamily: 'Inter',
                    fontWeight: FontWeight.w600,
                    height: 0.11,
                    letterSpacing: -0.15,
                  ),
                ),
                subtitle: Text(
                  userProvider.getUser!.email.toString(),
                  style: const TextStyle(
                    color: Color(0xFFD1D3D4),
                    fontSize: 12,
                    fontFamily: 'Inter',
                    fontWeight: FontWeight.w500,
                    height: 0.08,
                    letterSpacing: -0.12,
                  ),
                ),
                trailing: Builder(
                  builder: (context) => IconButton(
                    onPressed: () {
                      Scaffold.of(context).closeDrawer();
                    },
                    icon: const Icon(
                      size: 40,
                      Icons.close,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              AppListTile(onTap: () {}, title: 'Dashboard'),
              AppListTile(onTap: () {}, title: 'Books'),
              AppListTile(
                  onTap: () {
                    Navigator.pushNamed(context, RouteName.userManage);
                  },
                  title: 'Users'),
              AppListTile(onTap: () {}, title: 'Publishers'),
              AppListTile(
                  onTap: () {
                    Navigator.pushNamed(context, RouteName.staffManage);
                  },
                  title: 'Staff Members'),
              const Spacer(),
              Container(
                width: 265,
                height: 50,
                margin: const EdgeInsets.only(left: 10),
                padding: const EdgeInsets.all(5),
                decoration: ShapeDecoration(
                  color: const Color(0xFF14161A),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(40),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Expanded(
                      child: Container(
                        alignment: Alignment.center,
                        padding: const EdgeInsets.all(2),
                        clipBehavior: Clip.antiAlias,
                        decoration: ShapeDecoration(
                          color: index == 0
                              ? const Color(0xFF29303C)
                              : const Color(0xFF14161A),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(32),
                          ),
                        ),
                        child: InkWell(
                          onTap: () {
                            index = 0;
                            setState(() {});
                          },
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.light_mode,
                                color: Colors.white,
                              ),
                              Gap(5),
                              Text(
                                'Light',
                                style: TextStyle(
                                  color: Color(0xFFD1D3D4),
                                  fontSize: 15,
                                  fontFamily: 'Inter',
                                  fontWeight: FontWeight.w600,
                                  height: 0.11,
                                  letterSpacing: -0.15,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    Expanded(
                      child: Container(
                        alignment: Alignment.center,
                        padding: const EdgeInsets.all(2),
                        clipBehavior: Clip.antiAlias,
                        decoration: ShapeDecoration(
                          color: index == 1
                              ? const Color(0xFF29303C)
                              : const Color(0xFF14161A),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(32),
                          ),
                        ),
                        child: InkWell(
                          onTap: () {
                            setState(() {
                              index = 1;
                            });
                          },
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.dark_mode_outlined,
                                color: Colors.white,
                              ),
                              Gap(5),
                              Text(
                                'Dark',
                                style: TextStyle(
                                  color: Color(0xFFD1D3D4),
                                  fontSize: 15,
                                  fontFamily: 'Inter',
                                  fontWeight: FontWeight.w600,
                                  height: 0.11,
                                  letterSpacing: -0.15,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
