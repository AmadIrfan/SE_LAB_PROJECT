const mongo = require("mongoose");

mongo.set("strictQuery", false);

const url = process.env.DATA_BASE_URL;

mongo.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let db = mongo.connection;

db.on("error", () => {
	console.log("error db not connected");
});

db.once("open", (_) => {
	console.log("db connected");
});

module.exports = db;
