const route = require('express').Router();
// const messageService = require('../services/message.service');

module.exports = async(parentRouter) => {

    route.post('/message', async(req, res, next) =>{
        data = req.body
        
        res.send('hey')

    })

parentRouter.use('/send', route);

}