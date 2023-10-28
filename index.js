require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var app = express();

const db = require("./utils/db/mongoDB");
const morgan = require("morgan");

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.send('this is server')
});


app.listen(3000,()=>{
console.log('server is running');
})
