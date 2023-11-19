var express = require("express");
var path = require("path");
const cors = require("cors");
var logger = require("morgan");
const db = require("./utils/db/mongoDB");
var createError = require("http-errors");
const morgan = require("morgan");
var cookieParser = require("cookie-parser");
require("dotenv").config();
const authorRoute = require("./routes/author_route");
const bookRoute = require("./routes/bookRoute");
var app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/author", authorRoute);
app.use("/book", bookRoute);
app.get("/", (req, res) => {
	res.send("this is server");
});

app.listen(process.env.PORT, () => {
	console.log("server is running");
});
