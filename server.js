// const node biultin modules
const path = require("path");
// NPM modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
// App local modules
const mongoose = require("./db/connect");
const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/user");
var User = require("./models/user");

var app = express();

//define middlewares
// determine public path
app.use(express.static(path.join(__dirname,"public"))); 
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "zxcqweasd123",
  store: new MongoStore({
    url: "mongodb://localhost:27017/ecommerce",
    autoReconnect: true
  })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Configure express view with ejs template engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
// Application routes
app.use(userRoutes);
app.use(mainRoutes);


app.listen(3000, (err) => {
    if (err) throw err;
    console.log("Server running on 3000");
});
