import 'package:admin_app/widgets/admins_card.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:pie_chart/pie_chart.dart';
import '../models/user_model.dart';

class StaffManage extends StatefulWidget {
  const StaffManage({super.key});

  @override
  State<StaffManage> createState() => _StaffManageState();
}

class _StaffManageState extends State<StaffManage> {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  Map<String, double> dataMap = {
    "Total": 5,
    "active": 3,
    "inactive": 2,
  };
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: const Text('Staff Manage'),
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
                stream: _firestore.collection('admin').snapshots(),
                builder: (BuildContext context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child: CircularProgressIndicator.adaptive(),
                    );
                  } else {
                    return ListView.builder(
                      itemCount: snapshot.data!.docs.length,
                      itemBuilder: (BuildContext context, int index) {
                        UserModel u = UserModel.fromMap(
                          snapshot.data!.docs[index].data(),
                        );
                        return ADminCards(
                          userModel: u,
                        );
                      },
                    );
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
