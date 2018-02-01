/*

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Contact = require('../models/contact');

// get
router.get('/contacts', (req, res, next) => {
  Contact.find(function(err, contacts) {
    res.json(contacts);
  });
});

// add
router.post('/contacts', (req, res, next) => {
  let newContact = new Contact({
    cfname: req.body.fname,
    clname: req.body.lname,
    cphone: req.body.phone
  });

  Contact.addContact(newContact, (err, contact) => {
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
*/
