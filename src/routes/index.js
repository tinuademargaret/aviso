const express = require('express');
parentRouter = express.Router();

const messageRoute = require('../routes/message.route');
messageRoute(parentRouter);

module.exports = parentRouter;
