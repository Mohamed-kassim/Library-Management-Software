const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')


// connect the database 

mongoose.connect('mongodb://localhost/Library');
mongoose.Promise = global.Promise;

// middlewares
app.use(express.static('assets'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/managers',require('./api/controllers/authController') );
app.use('/books',require('./api/controllers/booksController') );    
app.use('/members',require('./api/controllers/membersController') );
app.use('/users',require('./api/controllers/usersController') );
app.use('/managers',require('./api/controllers/managersController') );

// start the server
app.listen(process.env.port || 4000, function () {  
    console.log('hey hey hey iam listening');
});