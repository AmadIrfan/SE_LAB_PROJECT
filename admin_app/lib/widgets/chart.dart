import 'package:flutter/material.dart';
import 'package:pie_chart/pie_chart.dart';

class PIChart extends StatelessWidget {
  const PIChart(
      {super.key,
      required this.chartName,
      required this.data,
      this.colors = const [
        Color(0xFF04BFDA),
        Color(0xFFFFA84A),
        Color(0xFF9B88ED)
      ]});
  final String? chartName;
  final List<Color>? colors;
  final Map<String, double> data;
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        children: [
          Text(
            chartName!,
            style: const TextStyle(
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
              dataMap: data,
              animationDuration: const Duration(milliseconds: 800),
              chartLegendSpacing: 32,
              chartRadius: MediaQuery.sizeOf(context).width / 2.2,
              colorList: colors!,
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
            ),
          ),
        ],
      ),
    );
  }
}
