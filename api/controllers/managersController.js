const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Members = require('../models/members');
const Issues = require('../models/issuedBooks');
const Branches = require('../models/branchesTable');

// add new library branch 
router.post('/branches/new', async  function (req,res) {  
    var name= req.body.name;
    await Branches.create({name:name}, function(err,branch){
        if(err){console.log("error in creating branch ");
        res.send("error in creating branch");}
        else{console.log("branch created successfully");
        res.send("branch created successfully");}
    });


});

// get all branches

router.get('/branches', function (req,res) {  
    Branches.find({},function (err, branches) { 
        if (err){res.send("cant get branches")}; 
        res.send(branches);
    });
} );



//delete  book
router.delete('/branches/:id', async function (req,res) {  
    let id = req.params.id;
    criteria = {
        _id : id
       };
       var t1 = await Branches.find(criteria);
        Branches.deleteOne(criteria, function (err) {
            if(err){console.log("error in deleting  branch ");
            res.send("error in deleting branch");}
            else{console.log("branch deleted successfully");
            res.send("branch deleted successfully");}
           });
       }

 );

 module.exports = router;