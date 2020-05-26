const config = require('../config/index');
const { rsmq } = require('../config/redis.config')
const message = require('../models/message');
const CustomError = require('../utils/error.helpers');


class messageService{

    saveMessage(data){
        const newMessage = new message(data)
        newMessage.save(function(err, result){
            if(err){
                throw new CustomError({
                    name : 'FieldError',
                    status: 404,
                    message: 'could not save message to db'
                })
            }
            return result._id;
        })
        
    }
    publishMessage(id){
        message.findById(id).exec(
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
        try{
        notification = JSON.stringify(notification)
        rsmq.sendMessage({qname:config.QUEUENAME1, message: notification}, (err)=>{
            if(err){
                throw new CustomError({
                    name: 'RedisPublishError',
                    status : 400,
                    message : `message with id ${id} failed to publish`,
                })
            }
        })
        console.log('message published to mediator successfully')
        message.findByIdAndUpdate(id, {sent:true})
        }catch(error){
            throw error;
        }
    }
    }
    module.exports = messageService;
