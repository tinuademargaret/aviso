const redis = require('redis');
const publisher = redis.createClient();
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
        publisher.publish('notificationService', notification);
        message.findByIdAndUpdate(id, {sent:true})
        }catch(error){
            throw error;
        }
    }
    }
    module.exports = messageService;
