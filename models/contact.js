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
  email: {
    type: String,
    required: true
  }
});

const Contact = module.exports = mongoose.model('Contact', ContactSchema);

module.exports.getUserById = function(fname, callback){
  const query = {fname: fname}
  Contact.findOne(query, callback);
}


module.exports.addContact = function(newContact, callback){
  newContact.save(callback);
}

/*
module.exports.compareEmail = function(candidateEmail, hash, callback){
  bcrypt.compare(candidateEmail, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
*/
