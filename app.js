var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var fileUpload = require("express-fileupload");
var cors = require("cors");

// router all
const addressRouter = require("./routes/addresses");
const authRouter = require("./routes/auth");
const bankRouter = require("./routes/banks");
const catalogProductRouter = require("./routes/catalogProduct");
const cartRouter = require("./routes/carts");
const indexRouter = require("./routes/index");
const postalCodeRouter = require("./routes/postalCodes");
const transactionRouter = require("./routes/transactions");
const customerRouter = require("./routes/customers");

const app = express();

// Passport configuration
// For Passport
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

// use all api
app.use("/api", indexRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/auth", authRouter);
app.use("/api/banks", bankRouter);
app.use("/api/carts", cartRouter);
app.use("/api/catalog-products", catalogProductRouter);
app.use("/api/postalcodes", postalCodeRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/customers", customerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
