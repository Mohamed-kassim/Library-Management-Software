const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// connect the database 

mongoose.connect('mongodb://localhost/Library');
mongoose.Promise = global.Promise;

// middlewares
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use('/books',require('./api/controllers/booksController') );
app.use('/members',require('./api/controllers/membersController') );
app.use('/users',require('./api/controllers/usersController') );
app.use('/managers',require('./api/controllers/managersController') );



// start the server
app.listen(process.env.port || 4000, function () {  
    console.log('hey hey hey iam listening');
});