// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;//"process.env" look for an open port to use 
const MongoClient = require('mongodb').MongoClient //"MongoClient " allows for making connections to MongoDB
var mongoose = require('mongoose'); // a package giving a consistent language so that anyone on project knows how to talk to database.  importing the Mongoose library into your code. to talk to mongo database
var passport = require('passport'); // passport: local startegy: that allows you to implement a usr name / /pass authenticatio mechanism fpr web app 
var flash    = require('connect-flash');// use flash to write error messages.

var morgan       = require('morgan'); // when user is logging out , another http logging libary for node.js for http request, helpful for monitoring and configuring applications
var cookieParser = require('cookie-parser'); //look at logged in session by seeing there cookies, It helps the computer remember things, like your preferences on websites, so you don't have to tell it every time reads cookie/request and use it to log in 
var bodyParser   = require('body-parser'); // built in to express, whatever user submits in form it will allow computer read and use that information (data is the body the user sends)
var session      = require('express-session');

var configDB = require('./config/database.js');// grabbing my  database from my folder database.js

var db

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => { //configDB is object and url is property
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db); //function call 
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));//"Urlencoded" is a way to send data from a form on a website to a server. AND  the extended: true option tells the server to be extra flexible in understanding the information you send from the form
app.use(express.static('public')) // express.static('public') means that all the files in a folder called "public" will be available to anyone who visits your website. AND  It's like opening a window to your computer's files and showing them to your website's visitors.


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2023b', // session secret
    resave: true,
    saveUninitialized: true
}));//make unique session and creates a secret session
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
