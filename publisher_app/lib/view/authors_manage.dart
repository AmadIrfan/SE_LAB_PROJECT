import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:publisher_app/data/API/api_calls.dart';
import 'package:publisher_app/res/routes/route_name.dart';
import 'package:publisher_app/widgets/author_cards.dart';

class AuthorManage extends StatefulWidget {
  const AuthorManage({super.key});

  @override
  State<AuthorManage> createState() => _AuthorManageState();
}

class _AuthorManageState extends State<AuthorManage> {
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
      body: Column(
        children: [
          Expanded(
            child: FutureBuilder(
              future: Provider.of<APICalls>(context).myAuthor(),
              builder: (BuildContext context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                }
                return ListView.builder(
                  itemCount: snapshot.data!.data!.length,
                  itemBuilder: (BuildContext context, int index) {
                    return ChangeNotifierProvider.value(value: snapshot.data!.data![index],child: AuthorCard() ,);
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
