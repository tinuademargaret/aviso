const config = require('./src/config');
const mailgun = require("mailgun-js");
const redis = require('redis');
const subscriber = redis.createClient();

subscriber.subscribe('emailService');
console.log('ready to consume');

try{
    subscriber.on('message', function(channel, notification){
        console.log('Message: ' + notification + ' on channel: ' + channel + ' has arrived!');
        const emailNotification = JSON.parse(notification)
        const sender = emailNotification.sender
        const recipient = emailNotification.recipient
        const body = emailNotification.message
        const domain = config.DOMAIN_NAME; 
        const apiKey = config.API_KEY; 
        const mg = mailgun({apiKey: apiKey, domain: domain});
        const email = {
	        from: 'Excited User <summittinuade@gmail.com>', 
	        to: recipient,
	        subject: 'Notification from slack',
	        text: sender + ': ' + body
        };
        mg.messages().send(email, function (error, body) {
	        console.log(body);
        }); 
    })
}catch(error){
    throw error
}
    