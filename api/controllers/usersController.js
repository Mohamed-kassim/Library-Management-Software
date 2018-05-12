const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Members = require('../models/members');
const Branches = require('../models/branchesTable');
const jobTitles = require('../models/jobTitles');
const Users = require('../models/users');

// creatae new user
router.post('/new', async  function (req,res) {
    var newData = req.body;  
    var job_title = newData.job_title;
    var branch_name = newData.branch_name;

    var t1 = await jobTitles.find({name: job_title});
    var t2 = await Branches.find({name: branch_name});
    t1 = t1[0]._id;
    t2 = t2[0]._id;

    let userData = {
        name : newData.name,
        job_id : t1,
        branch_id : t2,
        telephone_number : newData.telephone_number,
        address : newData.address,
        pay_rate : newData.pay_rate,
        work_hours : newData.work_hours,
 }; 


    await Users.create(userData, function(err,user){
        if(err){
            console.log(err);
        res.send("error in creating user");}
        else{console.log("user created successfully");}
    });
    res.redirect("/users");


});

// get users
router.get('/', function (req,res) {  
    Users.find({},function (err, users) {  
        res.send(users);
    });
} );

// delete user
router.delete('/:id',async function (req,res) {  
    //members should return all books before revoking their membership
    let userId = req.params.id;
    criteria = {
        _id : userId
       };
       Users.deleteOne(criteria, function (err) {
        if(err){console.log("error in deleting  user ");
        res.send("error in deleting user");}
        else{console.log("user deleted successfully");
        res.send("user deleted successfully");}
       });

 });


module.exports = router;