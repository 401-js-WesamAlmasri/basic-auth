'use strict';

// 3rd parties import
const express = require('express');
const router = express.Router();

// locally import
const basicAuthenticate = require('./middleware/basic');
const Users = require('./models/users-model');

router.post('/signup', signUp);
router.post('/signin', basicAuthenticate, signIn);

// routes handlers
async function signUp(req, res, next) {
  try {
    const user = new Users(req.body);
    const record = await user.save();
    res.status(201).json(record);
  } catch(e) {
    let error = new Error('Error Creating User');
    error.statusCode = 403;
    next(error);
  }
}

function signIn(req, res, next) {
  res.status(200).json({
    user: req.user,
  });
}

module.exports = router;
