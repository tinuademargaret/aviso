const express = require('express');
parentRouter = express.Router();

const messageRoute = require('./message.route');
messageRoute(parentRouter);

module.exports = parentRouter;
