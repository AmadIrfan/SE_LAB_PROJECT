var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var SignupRouter = require('./routes/signupRouter');
var loginRouter = require('./routes/loginRouter');
var addproductRouter = require('./routes/Admin/productRouter');
var getproductAdminRouter = require('./routes/Admin/productAdminRouter');
var statuschangeRouter = require('./routes/Admin/updatestatus');
var deleteproductRouter = require('./routes/Admin/deleteproduct');
var updateproductRouter = require('./routes/Admin/updateproduct');
var getcustomerproductRouter = require('./routes/Customer/getproduct');
var getspecefiedcustomerproductRouter = require('./routes/Customer/getspecefiedproducts');
var customercartRouter = require('./routes/Customer/AddtoCart');
var checkCartRouter = require('./routes/Customer/checkCartRoutes');
var getusercartRouter = require('./routes/Customer/GetUserCartData');
var deletecartRouter = require('./routes/Customer/deletecart');
var ccareRouter = require('./routes/Customer/CustomerCareIssue');
var adminccareRouter = require('./routes/Admin/GetCustomerCareRequests');
var submitreplyRouter = require('./routes/Admin/SubmitReply');
var buyProductRouter = require('./routes/Customer/BuyProducts');
var ShoppingCartRouter = require('./routes/Customer/Buy');
var middlewareRouter = require('./routes/authentication');
var boughtProductRouter = require('./routes/Customer/BoughtProduct');
var getAdminPaymentsRouter = require('./routes/Admin/GetPAyment');
var getadmincountsRouter = require('./routes/Admin/GetCountsinadmin');
var ReportRouter = require('./routes/Admin/Report');
var profileRouter = require('./routes/GetProfile');

var database = require("./utils/database"); // added by me
const { request } = require('http');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors()); // added by me
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Method", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', SignupRouter);
app.use('/login', loginRouter);
app.use('/addproduct', addproductRouter);
app.use('/getproducts', getproductAdminRouter);
app.use('/updateproduct', statuschangeRouter);
app.use('/deleteproduct', deleteproductRouter);
app.use('/updateProductdata', updateproductRouter);
app.use('/getproduct', getcustomerproductRouter);
app.use('/getspecefiedproducts', getspecefiedcustomerproductRouter);
app.use('/addToCart', customercartRouter);
app.use('/isInCart', checkCartRouter);
app.use('/getUserCart', getusercartRouter);
app.use('/deleteCartItem', deletecartRouter);
app.use('/CustomerCareIssue', ccareRouter);
app.use('/getCustomerCareRequests', adminccareRouter);
app.use('/submitReply', submitreplyRouter);
app.use('/buyProduct', buyProductRouter);
app.use('/buy', ShoppingCartRouter);
app.use('/authentication', middlewareRouter);
app.use('/boughtproducts', boughtProductRouter);
app.use('/getPayments', getAdminPaymentsRouter);
app.use('/getCountsinadmin', getadmincountsRouter);
app.use('/report', ReportRouter);
app.use('/getprofile', profileRouter);







// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use('/public', express.static(path.join(__dirname, 'public')));


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
