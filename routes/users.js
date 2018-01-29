const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Contact = require('../models/contact');
const mongoose = require('mongoose');

// register
router.post('/register', (req, res, next) => {
  //res.send('REGISTER');
  let newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    contacts: []
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });

});

// authenticate
router.post('/authenticate', (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // time
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            username: user.username
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

//profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});



// Contacts

// get
router.get('/contacts', (req, res, next) => {
  Contact.find(function(err, contacts) {
    res.json(contacts);
  });
});

// add
router.post('/contacts', (req, res, next) => {
  let newContact = new Contact({
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone
  });

  console.log(newContact);

  User.userAddContact(newContact, (err, contact) => {
    if(err){
      res.json({success: false, msg: 'Failed to register contact'});
    } else {
      res.json({success: true, msg: 'Contact registered'});
    }
  });

});

// delete
router.delete('/contacts/:id', (req, res, next) => {
  Contact.remove({_id: req.params.id}, function(err, result) {
    if(err){
      res.json(err);
    } else {
      res.json(result);
    }
  })
});




module.exports = router;
