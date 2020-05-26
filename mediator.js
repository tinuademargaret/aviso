const config = require('./src/config/index');
const RSMQWorker = require( "rsmq-worker" );
const worker1 = new RSMQWorker(config.QUEUENAME1 ,{interval:.1})
const { rsmq } = require('./src/config/redis.config')
// const redis = require('redis');
// const subscriber = redis.createClient();

// subscriber.subscribe(`${config.NAMESPACE}:rt:${config.QUEUENAME1}`); 

// console.log(`ready to consume ${config.NAMESPACE}:rt:${config.QUEUENAME1}` );
console.log('ready to consume')
    worker1.on('message', function (notification, next, notificationid) {
        console.log('Message: ' + notification + 'has arrived!');
        rsmq.popMessage({qname:config.QUEUENAME1}, (err, resp) =>{
            if(err){
                throw new CustomError({
                    name: 'RedisConsumeError',
                    status : 400,
                    message : `message could not be consumed`,
                    error: err
                })
            }
            if(resp.id){
                console.log(resp)
                rsmq.sendMessage({qname: config.QUEUENAME2, message: resp.message},(err)=>{
                    if (err){
                        console.error(err)
                        throw new CustomError({
                            name: 'RedisPublishError',
                            status : 400,
                            message : `message with could not be published`,
                            error: err
                        })
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
       next(); 
    });
worker1.on('error', function( err, msg ){
    console.log( "ERROR", err, msg.id );
});
worker1.on('exceeded', function( msg ){
console.log( "EXCEEDED", msg.id );
});
worker1.on('timeout', function( msg ){
    console.log( "TIMEOUT", msg.id, msg.rc );
});
worker1.start();

