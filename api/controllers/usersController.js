const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Members = require('../models/members');
const Branches = require('../models/branchesTable');
const jobTitles = require('../models/jobTitles');
const Users = require('../models/users');

// creatae new user
router.get("/new",async function(req, res){
    var t1 = await Branches.find({});
    var t2 = await jobTitles.find({});
    res.render("addUser",{branches:t1,jobs:t2})
});

router.post('/new', async  function (req,res) {
    var newData = req.body;
    
    let userData = {
        name : newData.name,
        job_id : newData.job,
        branch_id : newData.job,
        telephone_number : newData.number,
        address : newData.address,
        pay_rate : newData.pay_rate,
        work_hours : newData.work_hours,
 }; 

    await Users.create(userData, function(err,user){
        if(err){
            console.log(err);
            res.send("error in creating user");
        }
        else{
            console.log("user created successfully");
        }
    });
    res.redirect("/users");



});

// get users
router.get('/', function (req,res) {  
    Users.find({},function (err, users) {  
        res.render("viewUsers",{users:users});
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