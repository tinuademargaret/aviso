const config = require('../config');
const RedisSMQ = require('rsmq');
const publisher = new  RedisSMQ({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    ns: config.NAMESPACE,
    realtime: true
    // password: REDIS_PASSWORD
})
// const publisher = redis.createClient();
const message = require('../models/message');
const CustomError = require('../utils/error.helpers');


class messageService{

    saveMessage(data){
        const newMessage = new message(data)
        newMessage.save(function(err){
            if(err){
                throw new CustomError({
                    name : 'FieldError',
                    status: 404,
                    message: 'could not save message to db'
                })
            }
        })
    }
    publishMessage(id){
        message.findOne({'id':id}).exec(
            function(err, data){
                if(err){
                    throw new CustomError({
                        name: 'NotFoundError',
                        status : 404,
                        message : `could not find message with id ${id}`,
                    })
                }
                return JSON.stringify(data)
             } );
        var notification = {
            sender : data['sender'],
            message : data['summary'],
            time : data['time'],
            recipient : data['recipient']
        }
        
        console.log(notification);
        try{
        notification = JSON.stringify(notification)
        publisher.sendMessage({qname:config.QUEUENAME, message: notification}, (err) => {
            if (err){
                console.error(err);
                return;
            }
        })
        console.log('message published to mediator successfully')
        // publisher.publish('notificationService', notification);
        message.findByIdAndUpdate(id, {sent:true})
        }catch(error){
            throw error;
        }
    }
    }
    module.exports = messageService;
