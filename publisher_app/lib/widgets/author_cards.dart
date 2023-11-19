import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:publisher_app/data/API/api_calls.dart';
import 'package:publisher_app/models/author_model.dart' as aut;
import 'package:publisher_app/models/author_response.dart';
import 'package:publisher_app/res/routes/route_name.dart';
import 'package:publisher_app/utils/utils.dart';

class AuthorCard extends StatefulWidget {
  const AuthorCard({
    super.key,
    required this.callback,
  });
  final Function callback;
  @override
  State<AuthorCard> createState() => _AuthorCardState();
}

class _AuthorCardState extends State<AuthorCard> {
  @override
  Widget build(BuildContext context) {
    final aut.Data d = Provider.of<aut.Data>(context);
    return Card(
      child: ListTile(
        leading: const CircleAvatar(),
        title: Text(d.name.toString()),
        subtitle: Text(d.email.toString()),
        trailing: PopupMenuButton(
          itemBuilder: (context) => [
            PopupMenuItem(
              child: const Text('Edit'),
              onTap: () async {
                Navigator.pushNamed(context, RouteName.addAuthor, arguments: d);
              },
            ),
            PopupMenuItem(
              child: Text(d.active! ? 'In Active' : 'Active'),
              onTap: () async {
                try {
                  if (d.active!) {
                    AuthorResponse ar =
                        await Provider.of<APICalls>(context, listen: false)
                            .authorStatusChange(false, d.sId!);
                    Utils().showToast(ar.message.toString());
                  } else {
                    AuthorResponse ar =
                        await Provider.of<APICalls>(context, listen: false)
                            .authorStatusChange(true, d.sId!);
                    Utils().showToast(ar.message.toString());
                  }
                  widget.callback();
                } catch (e) {
                  Utils().showToast(e.toString());
                }
              },
            ),
            PopupMenuItem(
              child: const Text('Remove'),
              onTap: () async {
                try {
                  AuthorResponse ar =
                      await Provider.of<APICalls>(context, listen: false)
                          .deleteAuthor(d.sId!);
                  Utils().showToast(ar.message.toString());
                  widget.callback();
                } catch (e) {
                  Utils().showToast(e.toString());
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
