require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var app = express();

const db = require("./utils/db/mongoDB");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.send('this is server')
});

app.use(function (req, res, next) {
	next(createError(404));
});

app.listen(3000,()=>{
console.log('server is running');
})
app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
