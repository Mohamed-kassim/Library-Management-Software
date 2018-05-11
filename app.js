const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// connect the database 

mongoose.connect('mongodb://localhost/Library');
mongoose.Promise = global.Promise;

// middlewares
app.use(bodyParser.json());
app.use('/books',require('./api/controllers/booksController') );
// app.use('/members',require('./api/controllers/membersController') );
// app.use('/users',require('./api/controllers/usersController') );


// start the server
app.listen(process.env.port || 4000, function () {  
    console.log('hey hey hey iam listening');
});