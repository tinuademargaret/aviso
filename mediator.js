const redis = require('redis');
const subscriber = redis.createClient();
const email_service = require('./email.service');

subscriber.subscribe('service');

console.log('ready to consume');
subscriber.on('message', function (channel, message) {
console.log('Message: ' + message + ' on channel: ' + channel + ' is arrive!');
email_service(message);

});
