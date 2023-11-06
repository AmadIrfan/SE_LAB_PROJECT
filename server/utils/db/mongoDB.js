const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

const url = process.env.MONGO_URL;
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
	console.log("ERROR --> ", err.message);
});
db.once("open", () => {
	console.log("connected with db");
});  
