const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Contact = require('../models/contact');

// add
router.post('/profile', (req, res, next) => {
  res.send('Contact');
  let newContact = new Contact({
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone
  });

  Contact.addContact(newContact, (err, contact) => {
    if(err){
      res.json({success: false, msg: 'Failed to register contact'});
    } else {
      res.json({success: true, msg: 'Contact registered'});
    }
  });

});

module.exports = router;
