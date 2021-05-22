'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Create a mongoose model
const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// hash the password before saving the model
usersSchema.pre('save', async function (next) {
  let encryptedPassword = await bcrypt.hash(this.password, 5);
  this.password = encryptedPassword;
  next();
});

// method to authenticate the user using the hashed password
usersSchema.methods.isAuthenticated = function (password) {
  return bcrypt.compare(password, this.password);
};

const Users = mongoose.model('users', usersSchema);

module.exports = Users;
