const config = require('./src/config/index');
const mailgun = require("mailgun-js");
const RSMQWorker = require( "rsmq-worker" );
const worker2 = new RSMQWorker(config.QUEUENAME2, {interval:.1});
const { rsmq } = require('./src/config/redis.config');

// const redis = require('redis');
// const subscriber = redis.createClient();
// subscriber.subscribe(`${config.NAMESPACE}:rt:${config.QUEUENAME2}`);
console.log('ready to consume');

// try{
    worker2.on('message', function(msg, next, msgid){
        console.log('Message: ' + msg + 'has arrived!');
        rsmq.popMessage({qname:config.QUEUENAME2}, (err, resp)=>{
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
        next();
            });

// }catch(error){
    // throw error
// }
worker2.on('error', function( err, msg ){
    console.log( "ERROR", err, msg.id );
});
worker2.on('exceeded', function( msg ){
console.log( "EXCEEDED", msg.id );
});
worker2.on('timeout', function( msg ){
    console.log( "TIMEOUT", msg.id, msg.rc );
});
worker2.start();

    