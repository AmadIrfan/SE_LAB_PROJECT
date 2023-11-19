import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:publisher_app/models/author_model.dart';

class AuthorCard extends StatefulWidget {
  const AuthorCard({
    super.key,
  });

  @override
  State<AuthorCard> createState() => _AuthorCardState();
}

class _AuthorCardState extends State<AuthorCard> {
  @override
  Widget build(BuildContext context) {
    final Data d = Provider.of<Data>(context);
    return Card(
      child: ListTile(
        leading: const CircleAvatar(
            // child: Text(widget.index.toString()),
            ),
        title: Text(d.name.toString()),
        subtitle: Text(d.email.toString()),
        trailing: PopupMenuButton(
          itemBuilder: (context) => [
            PopupMenuItem(
              child: const Text('active'),
              onTap: () {},
            ),
          ],
        ),
      ),
    );
  }
}
