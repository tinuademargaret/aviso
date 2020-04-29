const redis = require('redis');
const subscriber = redis.createClient();
const publisher = redis.createClient();

subscriber.subscribe('notificationService');

console.log('ready to consume');
try{
    subscriber.on('message', function (channel, notification) {
        console.log('Message: ' + notification + ' on channel: ' + channel + ' has arrived!');
        publisher.publish('emailService', notification);
    });
}catch(error){
    throw error
}
