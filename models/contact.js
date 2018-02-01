const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// schema
const ContactSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

const Contact = module.exports = mongoose.model('Contact', ContactSchema);

module.exports.getContactById = function(id, callback){
  Contact.findById(id, callback);
}

module.exports.addContact = function(newContact, callback) {
  newContact.save(callback);
}

module.exports.returnContact = function() {
  return Contact;
}
