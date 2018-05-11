const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Books = require('../../models/books');


router.get('/', function (req,res) {  
    Books.find({},function (err, books) {  
        res.send(books);
    });
} );


router.post('/', function (req,res) {  
    newData = req.body;
    Books.create(newData).then(function () {  res.send('Book Created succesfully'); });

} );

router.put('/:isbn', function (req,res) { 
     console.log('now putting ');
     let isbn = req.params.isbn;
     let newData = req.body;
     criteria = {
         isbn : isbn
        };
     
     Books.update(criteria, newData, function () {
         res.send("Book updated succesfully")
        });
} );

router.delete('/:isbn', function (req,res) {  
    let isbn = req.params.isbn;
    criteria = {
        isbn : isbn
       };
    
    Books.deleteOne(criteria, function () {
        res.send("Book deleted succesfully") 
       });

} );

module.exports = router;