const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Members = require('../models/members');
const Issues = require('../models/issuedBooks');
const Branches = require('../models/branchesTable');
const jobTitles = require('../models/jobTitles');

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



//delete  branch 
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

 //get all job titles

router.get('/job_titels', function (req,res) {  
    jobTitles.find({},function (err, job_titles) { 
        if (err){
            console.log(err);
            res.send("cant get job titles")}; 
        res.send(job_titles);
    });
} );

// post new job title
router.post('/job_titels/new', async  function (req,res) {  
    var name= req.body.name;
    await jobTitles.create({name:name}, function(err,job_title){
        if(err){console.log("error in creating job title ");
        res.send("error in creating job title");}
        else{console.log("job title created successfully");
        res.send("job title created successfully");}
    });
});

router.delete('/job_titels/:id', async function (req,res) {  
    let id = req.params.id;
    criteria = {
        _id : id
       };
       var t1 = await jobTitles.find(criteria);
       jobTitles.deleteOne(criteria, function (err) {
            if(err){console.log("error in deleting  job title ");
            res.send("error in deleting job title");}
            else{console.log("branch deleted job title");
            res.send("branch deleted job title");}
           });
       }
 );
 module.exports = router;