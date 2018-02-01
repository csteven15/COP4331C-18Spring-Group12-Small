const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const user = require('./users');

var Contact = module.exports = mongoose.model('Contact', ContactSchema);
var User = module.exports = mongoose.model('User', UserSchema);

var steven = new User {
  _id: new mongoose.Types.ObjectId(),
  fname: 'Steven',
  lname: 'Chen',
  email: 'chen@gmail.com',
  username: 'steven',
  password: 'chen'
};

steven.save(function(err) {
  if (err) throw err;
  console.log()
})
