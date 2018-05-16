const express = require('express');
const router = express.Router();
function requiresManagerLogin(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
      var err = new Error('You must be logged in as manager to view this page.');
      err.status = 401;
      return next(err);
    }
  }
  
  router.get('/managers/profile', requiresManagerLogin, function(req, res, next) {
  });

  function requiresUserLogin(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
      var err = new Error('You must be logged in as user to view this page.');
      err.status = 401;
      return next(err);
    }
  }
  
  router.get('/users/profile', requiresUserLogin, function(req, res, next) {
  });