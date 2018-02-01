// mongoose is a node module for MongoDB validation, casting & boilerplate
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// in the user.js there is a const for contact 
// this could maybe be the problem in why the contact is null

// schema for friend
// same as contact
const friendSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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

var Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;

module.exports.getFriendById = function(id, callback) { Friend.findById(id, callback) }

module.exports.addFriend = function(newFriend, callback) { 
	newFriend.save(callback)
	return callback
}

module.exports.returnFriend = function() { return Friend; }
