const route = require('express').Router();
const messageService = require('../services/message.service');
var redis = require('redis');
var publisher = redis.createClient()

module.exports = async(parentRouter) => {

    route.post('/message', async(req, res, next) =>{
        data = req.body
        
        messageService(data)
        // publisher.publish('service', message);
        res.send('ok')

    })

parentRouter.use('/send', route);

}