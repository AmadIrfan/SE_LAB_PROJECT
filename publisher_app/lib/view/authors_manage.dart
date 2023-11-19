import 'package:flutter/material.dart';
import 'package:provider/provider.dart';


import '../data/API/api_calls.dart';
import '../res/colors.dart';
import '../res/routes/route_name.dart';
import '../widgets/author_cards.dart';

class AuthorManage extends StatefulWidget {
  const AuthorManage({super.key});

  @override
  State<AuthorManage> createState() => _AuthorManageState();
}

class _AuthorManageState extends State<AuthorManage> {
  String query = '';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('Authors'),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.pushNamed(context, RouteName.addAuthor);
            },
            icon: const Icon(Icons.add),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          setState(() {});
        },
        child: Column(
          children: [
            Container(
              color: darkBlueColor.withOpacity(0.3),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  FilterChip(
                    selected: query == '' ? true : false,
                    onSelected: (v) {
                      setState(() {
                        query = '';
                      });
                    },
                    label: const Text('All'),
                  ),
                  FilterChip(
                    selected: query == 'active=true' ? true : false,
                    onSelected: (v) {
                      setState(() {
                        query = 'active=true';
                      });
                    },
                    label: const Text('Active'),
                  ),
                  FilterChip(
                    selected: query == 'active=!true' ? true : false,
                    onSelected: (v) {
                      setState(() {
                        query = 'active=!true';
                      });
                    },
                    label: const Text('In Active'),
                  ),
                ],
              ),
            ),
            Expanded(
              child: FutureBuilder(
                future: Provider.of<APICalls>(context).myAuthor(query),
                builder: (BuildContext context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  } else if (snapshot.hasData) {
                    if (snapshot.data!.data!.isEmpty) {
                      return const Center(
                        child: Text('No document Found'),
                      );
                    }
                    return ListView.builder(
                      itemCount: snapshot.data!.data!.length,
                      itemBuilder: (BuildContext context, int index) {
                        return ChangeNotifierProvider.value(
                          value: snapshot.data!.data![index],
                          child: AuthorCard(
                            callback: onCallBack,
                          ),
                        );
                      },
                    );
                  } else {
                    return Center(
                      child: Text(
                        snapshot.error.toString(),
                      ),
                    );
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  void onCallBack() {
    setState(() {});
  }
}
