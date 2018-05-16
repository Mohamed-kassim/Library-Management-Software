const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var authFunctions = require('./api/helpers/authFunction');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// connect the database 

mongoose.connect('mongodb://localhost/Library');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
app.use(session({
    secret: '11:39 pm',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
      })
  }));
// middlewares
app.use(express.static('assets'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/managers',require('./api/controllers/authController') );
app.use('/books',require('./api/controllers/booksController') );    
app.use('/members',require('./api/controllers/membersController') );
app.use('/users',require('./api/controllers/usersController') );
app.use('/managers',require('./api/controllers/managersController') );
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('for sorry File Not Found');
    err.status = 404;
    next(err);
  });

// 
// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });
//  
// start the server
app.listen(process.env.port || 4000, function () {  
    console.log('hey hey hey iam listening here on port 4000');
});