const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// schema
const ContactSchema = mongoose.Schema({
  cfname: {
    type: String,
    required: true
  },
  clname: {
    type: String,
    required: true
  },
  cphone: {
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
  return callback;
}

module.exports.returnContact = function() {
  return Contact;
}
