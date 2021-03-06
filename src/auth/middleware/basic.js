'use strict';

const base64 = require('base-64');
const Users = require('../models/users-model');

module.exports = async (req, res, next) => {
  try {
    // get the encoded credentials pairs
    let basicHeaderParts = req.headers.authorization.split(' ');
    let encodedString = basicHeaderParts.pop();
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(':');

    const user = await Users.findOne({ username: username });
    const valid = await user.isAuthenticated(password);
    if (valid) {
      req.user = user;
      next();
    } else {
      throw new Error('Invalid User');
    }
  } catch (e) {
    let error = new Error('Invalid Login');
    error.statusCode = 403;
    next(error);
  }
};
