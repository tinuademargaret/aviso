const route = require('express').Router();
const messageService = require('../services/message.service');
const ms = new messageService();

module.exports = async(parentRouter) => {

    route.post('/message', async(req, res, next) =>{
        try{
            data = req.body
            ms.saveMessage(data)
            await ms.publishMessage(data.id)
            const response = {
                status : 200,
                message : 'succesful request'
                }
            return res.json(response)
        }catch(error){
            return next(error)
        }
    });
    
parentRouter.use('/send', route);

}