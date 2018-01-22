const express = require('express');
const router = express.Router();
const passport = require('passport');
//const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Contact = require('../models/contact');

// register
router.post('/register', (req, res, next) => {
  //res.send('REGISTER');
  let newContact = new Contact({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email

  });

  Contact.addContact(newContact, (err, contact) => {
    if(err){
      res.json({success: false, msg: 'Failed to register contact'});
    } else {
      res.json({success: true, msg: 'Contact registered'});
    }
  });

});

// authenticate
router.post('/authenticate', (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  Contact.getUserById(fname, (err, contact) => {
    if(err) throw err;
    if(!contact){
      return res.json({success: false, msg: 'Contact not found'});
    }
  })
});

// profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({contact: res.contact});
});


module.exports = router;
