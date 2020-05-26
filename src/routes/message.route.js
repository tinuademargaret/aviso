const route = require('express').Router();
const messageService = require('../services/message.service');
const ms = new messageService();

module.exports = async(parentRouter) => {

    route.post('/message', async(req, res, next) =>{
        try{
            data = req.body
            savedMessageId = await ms.saveMessage(data)
            await ms.publishMessage(savedMessageId)
            const response = {
                status : 202,
                message : 'Accepted request'
                }
            return res.json(response)
        }catch(error){
            return next(error)
        }
    });
    
parentRouter.use('/send', route);

}