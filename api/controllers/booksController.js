const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../models/books');
const Authors = require('../models/authors');
const Publishers = require('../models/publishers');
const Languages = require('../models/languages');


router.delete('/:id', function (req,res) {  
    let id = req.params.id;
    criteria = {
        isbn : isbn
       };
    
    Books.deleteOne(criteria, function () {
        res.send("Book deleted succesfully") 
       });

} );


router.get('/', function (req,res) {  
    Books.find({},function (err, books) {  
        res.send(books);
    });
} );

// create books
router.post('/',async function (req,res) {  
    newData = req.body;
    let authorName = newData.author_name;
    let publisherName = newData.publisher_name;
    let languageName = newData.language_name;
    let authorId ;
    let publisherId;
    let languageId;

    var t1 = await Authors.find({name: authorName});
    var t2 = await Publishers.find({name: publisherName});
    var t3 = await Languages.find({name: languageName});
    t1 = t1[0]._id;
    t2 = t2[0]._id;
    t3 = t3[0]._id;
    
    let bookdata = {
        name : newData.name,
        isbn : newData.isbn,
        author_id : t1,
        Publisher_id : t2,
        edition : newData.edition,
        book_shelf : newData.book_shelf,
        row_number : newData.row_number,
        column_number : newData.column_number,
        description : newData.description,
        available : newData.available,
        language_id : t3 };

    
    Books.create(bookdata, function (err, book) { 
        if(err){console.log("ERROR");}
        else{console.log("sucsess");}
        //console.log(bookdata);
        });
        
     res.send("book Created");
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

/// issue a book 
/// get issued books data

router.post('/issues/', async function (req,res) {  
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

router.get('/issues/', function (req,res) {  
    issuedBooks.find({},function (err, books) {  
        res.send(books);
    });
} );


module.exports = router;