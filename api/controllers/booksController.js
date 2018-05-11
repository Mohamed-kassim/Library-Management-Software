const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../models/books');
const Authors = require('../models/authors');



router.delete('/:isbn', function (req,res) {  
    let isbn = req.params.isbn;
    criteria = {
        isbn : isbn
       };
    
    Books.deleteOne(criteria, function () {
        res.send("Book deleted succesfully") 
       });

} );

/// issue a book 
/// get issued books data
router.get('/issues/', function (req,res) {  
    issuedBooks.find({},function (err, books) {  
        res.send(books);
    });
} );
router.get('/', function (req,res) {  
    Books.find({},function (err, books) {  
        res.send(books);
    });
} );


router.post('/', function (req,res) {  
    newData = req.body;
    let authorName = newData.name;
    Authors.find({name: auth})
    Books.create(newData, function (err, book) { 
        res.send(book);
});
});

router.put('/:id', function (req,res) { 
    console.log('now putting ');
    let id = req.params.id;
    let newData = req.body;
    criteria = {
        _id : id
       };
    
    Books.update(criteria, newData, function () {
        res.send("Book updated succesfully")
       });
} );

router.post('/', async function (req,res) {  
    let data = req.body;
    let id = data._id;
    let type = data.issue_type;
    let bookState;
    Books.find({_id: id},async function (err, book) { 
        bookState=book.available;
     });

    if((bookState && type==="borrow") || type==="return")
    {
        await issuedBooks.create(data);
        criteria = {
            _id : id
        };
        (type === "borrow") ? available = false : available = true;
        Books.update(criteria, {available : available}, function () {
            res.send("Book availability updated succesfully")
        });
    }
});


module.exports = router;