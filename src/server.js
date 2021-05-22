'use strict';

// import resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// import routers and error handlers
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');
const authRouter = require('./auth/router');

// registering middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register routers
app.use(authRouter);

// error handlers
app.use('*', notFoundHandler);
app.use(errorHandler);

function start(port) {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
