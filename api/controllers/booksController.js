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

    await Authors.find({name: authorName}, async function (err, author) { 
        if (author[0] === undefined){
            //create author 
            await Authors.create({name : authorName});
            await Authors.find({name: authorName}, function (err, author) { 
            authorId = author[0]._id;
            console.log("author created  here with id ", authorId) ;
            }).exec();
         }
         else{
            authorId = author[0]._id;
            console.log("author is here with id ", authorId) ;
         }
        }
    ).exec();
     await Publishers.find({name: publisherName}, async function (err, publisher) { 
        if (publisher[0] === undefined)
        {
            await Publishers.create({name : publisherName, email : "default ", telephone_number : 522});
            await Publishers.find({name: publisherName}, function (err, publisher) { 
                publisherId = publisher[0]._id;
                console.log("publisher created  here with id ", publisherId) ;
             }).exec();
             
        } else{
        publisherId = publisher[0]._id;
        
        console.log("publisher is here with id ", publisherId) ;

    }   
     }).exec();

     await Languages.find({name: languageName},await async function (err, language) { 
        if (language[0] === undefined)
        {
            await Languages.create({name : languageName});
            await Languages.find({name: languageName}, function (err, language) { 
                languageId = language[0]._id;
                console.log("language created  here with id ", languageId) ;
             }).exec();
        }
        else{
        languageId = language[0]._id;
        console.log("language is here with id ", languageId) ;
    }
     }).exec();

     idObj =  {
         authorId : authorId, 
         publisherId :  publisherId , 
         languageId : languageId};

    let bookdata = {
        name : newData.name,
        isbn : newData.isbn,
        author_id : idObj.authorId,
        Publisher_id : idObj.publisherId,
        edition : newData.edition,
        book_shelf : newData.book_shelf,
        row_number : newData.row_number,
        column_number : newData.column_number,
        description : newData.description,
        available : newData.available,
        language_id :idObj.languageId }

     Books.create(bookdata, function (err, book) { 
        console.log(bookdata);
        res.send(err); });


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

router.post('/issues', async function (req,res) {  
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