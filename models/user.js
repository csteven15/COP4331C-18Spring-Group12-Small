const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const contact = require('./contact');

// schema
const UserSchema = mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: false
  }]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.userAddContact = function(newContact, callback) {
  const query = {username: newContact.username};
  console.log(query);
  newContact.save(callback);
}

module.exports.getContactById = function(id, callback){
  Contact.findById(id, callback);
}
