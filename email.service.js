const config = require('./src/config');
const mailgun = require("mailgun-js");
// const RedisSMQ = require('rsmq');
// const emailer = new RedisSMQ({
    // host: config.REDIS_HOST,
    // port: config.REDIS_PORT,
    // ns: config.NAMESPACE,
    // realtime: true,
    // password: config.REDIS_PASSWORD
// })
const { emailer } = require('./src/config/redis.config')

const redis = require('redis');
const subscriber = redis.createClient();


subscriber.subscribe(`${config.NAMESPACE}:rt:${config.QUEUENAME2}`);
console.log('ready to consume');

try{
    subscriber.on('message', function(channel, msg){
        console.log('Message: ' + msg + ' on channel: ' + channel + ' has arrived!');
        emailer.popMessage({qname:config.QUEUENAME2}, (err, resp)=>{
            if(err){
                console.error(err);
            }
            if(resp.id){
                console.log('message dequeued')
                const notification = resp.message
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
            }
            else{
                console.log('no message queue')
            }
        })
            })
}catch(error){
    throw error
}
    