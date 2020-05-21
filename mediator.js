const config = require('./src/config');
const RedisSMQ = require('rsmq');
const mediator = new RedisSMQ({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    ns: config.NAMESPACE,
    realtime: true
    // password: REDIS_PASSWORD
})
const redis = require('redis');
const subscriber = redis.createClient();

subscriber.subscribe(`${config.NAMESPACE}:rt:${config.QUEUENAME1}`); 

console.log('ready to consume');
try{
    subscriber.on('message', function (channel, notification) {
        console.log('Message: ' + notification + ' on channel: ' + channel + ' has arrived!');
        mediator.receiveMessage({qname:config.QUEUENAME1}, (err, resp) =>{
            if(err){
                console.error('consumer error: ' + err)
            }
            if(resp.id){
                mediator.sendMessage({qname: config.QUEUENAME2, message: resp.message},(err)=>{
                    if (err){
                        console.error('producer error: ' + err);
                    }
                    else{
                        console.log('message published successfully' )
                    }
                })
            }
            else{
                console.log('no message in the queue');
            }
        })
        
    });
}catch(error){
    throw error
}

