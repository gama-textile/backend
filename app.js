var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
const fileUpload = require("express-fileupload");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const banksRouter = require("./routes/banks");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const suppliersRouter = require("./routes/suppliers");
var addressRouter = require("./routes/addresses");

var app = express();

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

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/banks", banksRouter);
app.use("/api/auth", authRouter);
app.use("/api/products/", productsRouter);
app.use("/api/suppliers", suppliersRouter);
app.use("/api/addresses", addressRouter);

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
