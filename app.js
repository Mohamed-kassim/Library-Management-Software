const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/Library');
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use('/books',require('./api/routes/books') );
app.use('/books/issues',require('./api/routes/issue/issue') );

app.listen(process.env.port || 4000, function () {  
    console.log('hey hey hey iam listening');
});