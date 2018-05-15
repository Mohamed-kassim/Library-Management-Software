const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const usersLoginData = require('../models/usersLoginData');
const jwt = require('jsonwebtoken');

function verifyToken(req,res,next) {  
    // Format of token  : bearer <access_token>
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
        // split at the space 
        const bearer = bearerHeader.split(' ');
        // get the token from bearer 
        const bearerToken = bearer[1];
        //set the token 
        req.token = bearerToken;
        // next middleware
        next();
    }
    else{
        // frobidden 
        console.log("here 1 ");
        res.sendStatus(403);
    }
};
router.post('/register',async (req, res) => {
    name = req.body.username ;
    password = usersLoginData.generateHash(req.body.password);
    let userData = {
        email :  req.body.email,
        username: req.body.username, 
        password : password
    }
    await usersLoginData.create(userData);
    res.json({
        message : 'user created successfully welcome ',
        name : name
    });
  });
router.post('/posts',verifyToken, (req,res)=>{  
    jwt.verify(req.token, '$2a$08$GScgulPMAATjKruJLcWWCOqs2SdLoU9QA0W83cftLP/GWLuopmQk6', (err, authData) =>{
        console.log(req.token)
        if (err){
            console.log(err);
            console.log("here 2 ");
            res.sendStatus(403);
        }
        else{
            res.json({
                message :' yes u are here ',
                authData
            })
        }
    })
});

router.post('/login', (req, res)=>{
    let payload;
    let secretkey;
    console.log(req.body);
    username = req.body.username;
    password =req.body.password;
    usersLoginData.findOne({username : username}, (err, userData)=>{
        console.log(userData);

        if (err){
            res.send('please enter a valid user name');
        }
        console.log(userData.password);
        console.log(usersLoginData.validPassword(password, userData.password));
        if (usersLoginData.validPassword(password, userData.password)){
            //password match
            console.log(userData)
            payload = {
                id : userData._id,
                username : userData.username,
                email : userData.email
            }
            secretkey = userData.password;
            jwt.sign({payload}, secretkey,(err, token)=>{
                res.json(
                    {
                        message : 'welcome to our library',
                        name : req.body.username,
                        password : userData.password,
                        token 
                    }
                )
            });
        }
        else{
            res.json({
                message : 'please enter a valid password'
            });
        }



    });

});
module.exports = router