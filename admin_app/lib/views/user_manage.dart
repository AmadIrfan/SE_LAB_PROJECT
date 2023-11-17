import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:pie_chart/pie_chart.dart';

import '../models/user_model.dart';
import '../widgets/user_card.dart';

class UserManage extends StatefulWidget {
  const UserManage({super.key});

  @override
  State<UserManage> createState() => _UserManageState();
}

class _UserManageState extends State<UserManage> {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  Map<String, double> dataMap = {
    "Flutter": 5,
    "React": 3,
    "Ionic": 2,
  };
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: const Text('Users'),
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          setState(() {});
        },
        child: Column(
          children: [
            const Text(
              'Statistics',
              style: TextStyle(
                color: Color(0xFF243465),
                fontSize: 20,
                fontFamily: 'Nunito Sans',
                fontWeight: FontWeight.w700,
                height: 0,
                letterSpacing: 0.28,
              ),
            ),
            Expanded(
                child: PieChart(
              dataMap: dataMap,
              animationDuration: const Duration(milliseconds: 800),
              chartLegendSpacing: 32,
              chartRadius: MediaQuery.sizeOf(context).width / 2.2,
              colorList: const [
                Color(0xFF04BFDA),
                Color(0xFFFFA84A),
                Color(0xFF9B88ED)
              ],
              initialAngleInDegree: 0,
              chartType: ChartType.ring,
              ringStrokeWidth: 30,
              legendOptions: const LegendOptions(
                showLegendsInRow: true,
                legendPosition: LegendPosition.bottom,
                showLegends: true,
                legendShape: BoxShape.circle,
                legendTextStyle: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),
              chartValuesOptions: const ChartValuesOptions(
                showChartValueBackground: true,
                showChartValues: true,
                showChartValuesInPercentage: false,
                showChartValuesOutside: false,
                decimalPlaces: 1,
              ),
            )),
            Expanded(
              child: StreamBuilder(
                stream: _firestore.collection('user').snapshots(),
                builder: (BuildContext context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child: CircularProgressIndicator.adaptive(),
                    );
                  } else {
                    if (snapshot.hasData) {
                      return ListView.builder(
                        itemCount: snapshot.data!.docs.length,
                        itemBuilder: (BuildContext context, int index) {
                          UserModel u = UserModel(
                            id: (snapshot.data!.docs[index]['id']).toString(),
                            email: (snapshot.data!.docs[index]['email'])
                                .toString(),
                            isSuperAdmin: bool.parse((snapshot.data!.docs[index]
                                    ['isSuperAdmin'])
                                .toString()),
                            profileImage: (snapshot.data!.docs[index]
                                    ['profileImage'])
                                .toString(),
                            active: bool.parse((snapshot.data!.docs[index]
                                    ['active'])
                                .toString()),
                            phone: (snapshot.data!.docs[index]['phone'])
                                .toString(),
                            name:
                                (snapshot.data!.docs[index]['name']).toString(),
                            createDate: (snapshot.data!.docs[index]
                                    ['createDate'] as Timestamp)
                                .toDate(),
                            updateDate: (snapshot.data!.docs[index]
                                    ['updateDate'] as Timestamp)
                                .toDate(),
                            role:
                                (snapshot.data!.docs[index]['role']).toString(),
                          );
                          return UserCard(
                            userModel: u,
                          );
                        },
                      );
                    } else {
                      return const Center(
                        child: CircularProgressIndicator(),
                      );
                    }
                  }
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
