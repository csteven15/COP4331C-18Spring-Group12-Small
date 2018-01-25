const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Contact = require('../models/contact');
const friendModel = require('../models/friend');
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
    friends: []
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

// profile
router.post('/profile', (req, res, next) => {
  let newFriend = new friendModel({
    _id : new mongoose.Types.ObjectId(),
    cfname : req.body.fname,
    clname : req.body.lname,
    cphone : req.body.phone
  });

  console.log('Initialized new friend!')
  console.log(newFriend);

  User.addFriend2(newFriend, (err, user) =>  {
    if(err){
      res.json({success: false, msg: 'Failed to register friend'});
    } else {
      res.json({success: true, msg: 'Friend registered'});
    }
  });

  res.json({user: req.user});

  // let newContact = new Contact({
  //   cfname: req.body.fname,
  //   clname: req.body.lname,
  //   cphone: req.body.phone
  // });

  // console.log(req);
  // console.log(res);
  // console.log(next);

  // User.addContact(newContact, (err, user) => {
  //   if(err){
  //     res.json({success: false, msg: 'Failed to register user'});
  //   } else {

  //     res.json({success: true, msg: 'Contact registered'});
  //   }
  // });

  // res.json({user: req.user});

});


module.exports = router;
