const redis = require('redis');
const publisher = redis.createClient()
const client = redis.createClient()

function message_service(data){
    msg = data.message 
    msg_length = msg.length
    var message = {
        'sender': data.sender,
        'recipient': data.recipient,
        'message': data.message.slice(0,msg_length/2),
        'time': data.time
    }
    message = JSON.stringify(message)
    publisher.publish('service', message);
    client.set('message', message);
}

module.exports = message_service;