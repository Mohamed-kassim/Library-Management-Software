const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../../../models/books');
const issuedBooks = require('../../../models/issuedBooks');


router.get('/', function (req,res) {  
    issuedBooks.find({},function (err, books) {  
        res.send(books);
    });
} );

router.post('/', async function (req,res) {  
    let data = req.body;
    let isbn = data.isbn;
    let type = data.issue_type;
    let bookState;
    Books.find({isbn: isbn},function (err, book) { bookState=book.available; });
    if((bookState && type==="borrow") || type==="return")
    {
        await issuedBooks.create(data).then(function () {  console.log('Book issued succesfully'); });
        criteria = {
            isbn : isbn
        };
        (type === "borrow") ? available = false : available = true;
        Books.update(criteria, {available : available}, function () {
            res.send("Book availability updated succesfully")
        });
    }
});

module.exports = router;



