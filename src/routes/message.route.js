const route = require('express').Router();


module.exports = (parentRouter) => {

    route.get('/message', async(req, res, next) =>{
        return 'Hi'
    })

parentRouter.use('/send', route);

}