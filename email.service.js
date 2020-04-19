const redis = require('redis');
const subscriber = redis.createClient();

console.log('ready to consume');
subscriber.on('message', function (channel, message) {
 console.log('Message: ' + message + ' on channel: ' + channel + ' is arrive!');
});

subscriber.subscribe('service');

