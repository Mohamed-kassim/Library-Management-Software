const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Members = require('../models/members');
const Issues = require('../models/issuedBooks');
const Branches = require('../models/branchesTable');

// vieaw all members 
router.get('/',async function (req,res) {  
    var t1 = await Members.find({});
    res.render("viewMembers",{members: t1});
} );

router.get('/new', async function(req, res){
    var t1 = await Branches.find({});
    res.render("addMember",{branches: t1})
});

//Adding a member
router.post('/new',async function (req,res) {  
    newData = req.body;
    var t1 = await Branches.find({name : newData.branch_name});
    t1 = t1[0]._id;
    let memberdata = {
        name : newData.name,
        branch_id : t1,
        telephone_number : newData.number
     };

    await Members.create(memberdata, function (err, member) { 
        if (err){
            console.log (err);
            res.send("cant create members")}
        else{res.redirect("/books/table");} 
        });   
    }); 



//  delete a member 
router.delete('/:id',async function (req,res) {  
    //members should return all books before revoking their membership
    let member_id = req.params.id;
    criteria = {
        _id : member_id
       };
       var t1 = await Issues.find({member_id: member_id});
       console.log(t1);
       if (t1.issue_type === undefined || t1.issue_type === "return"){
        Members.deleteOne(criteria, function () {
            res.send("member deleted succesfully") 
           });
       }
       else 
           res.send('member should return book before being deleted');
       } );



    module.exports = router;