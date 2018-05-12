const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../models/books');
const Authors = require('../models/authors');
const Publishers = require('../models/publishers');
const Languages = require('../models/languages');


router.delete('/:id', async function (req,res) {  
    let id = req.params.id;
    criteria = {
        _id : id
       };
       var t1 = await Books.find(criteria);
       if (t1.available == true){
        Books.deleteOne(criteria, function () {
            res.send("Book deleted succesfully") 
           });
       }
       else{
           res.error("book is borrowed u can't delete it ");
       }

} );

router.get('/newAuthor',function(req,res){
    res.render("addAuthor");
});

router.post('/author',function(req,res){
    var name= req.body.name;
    console.log(name);
    Authors.create({name:name}, function(err,author){
        if(err){console.log("author Create sucsess ERROR");}
        else{console.log("author Create sucsess");}
    });
    res.redirect("/books/newAuthor");
});

router.get('/', function (req,res) {  
    Books.find({},async function (err, books) {
        var arr = [];
        for(var i=0;i<books.length;i++){
            var x = await Authors.find({_id:books[i].author_id});
            arr.push(x[0].name); 
        };
        res.render("index",{books:books,authors:arr});
    });
    
} );

router.post('/search', function (req,res) {
    var name = req.body.name;
    Books.find({name:name},async function (err, books) {
        var arr = [];
        for(var i=0;i<books.length;i++){
            var x = await Authors.find({_id:books[i].author_id});
            arr.push(x[0].name); 
        };
        res.render("index",{books:books,authors:arr});
    });
    
    
} );

router.get('/new', async function(req, res){
    var t1 = await Authors.find({});
    var t2 = await Publishers.find({});
    var t3 = await Languages.find({});
    res.render("addBook",{authors:t1,publishers:t2,languages:t3});
});

// create books
router.post('/',async function (req,res) {  
    var newData = req.body;

    let authorName = newData.author;
    let publisherName = newData.publisher;
    let languageName = newData.language;
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
        book_shelf : newData.shelf,
        row_number : newData.row,
        column_number : newData.col,
        description : newData.description,
        available : true,
        language_id : t3 };

    
    Books.create(bookdata, function (err, book) { 
        if(err){console.log("Book Create sucsess ERROR");}
        else{console.log("Book Create sucsess");}
        //console.log(bookdata);
        });
        
     res.redirect("/books");
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