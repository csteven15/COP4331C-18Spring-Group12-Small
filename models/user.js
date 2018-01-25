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
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
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
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Friend'
    }
  ],
  friend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Friend'
  }
  /*
  contacts: [{
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
  }]
  */
});

const User = module.exports = mongoose.model('User', UserSchema);
const Contact = contact.returnContact();

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

module.exports.addContact = function(newUser, callback) {
  newUser.contact = Contact.addContact(callback);
  newUser.save(callback);
}

module.exports.getContactById = function(id, callback){
  Contact.findById(id, callback);
}

// it seems like this is the issue?
module.exports.addFriend = function(newFriend, callback) {
  console.log(this);
  console.log(newFriend);
  console.log(this.friends);
  this.friends.push(newFriend);
  newFriend.save(callback);
}

module.exports.addFriend2 = function(newFriend, callback) {
  console.log('Call add friend method');
  console.log(this);
  console.log(newFriend);
  this.friend = newFriend;
  newFriend.save(callback);
}
