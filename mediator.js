const config = require('./src/config/index');
const RSMQWorker = require( "rsmq-worker" );
const worker1 = new RSMQWorker(config.QUEUENAME1 ,{interval:.1})
const { rsmq } = require('./src/config/redis.config')
console.log('ready to consume')
    worker1.on('message', function (notification, next, notificationid) {
        console.log('Message: ' + notification + 'has arrived!');
            if(notification){
                rsmq.sendMessage({qname: config.QUEUENAME2, message: notification},(err)=>{
                    if (err){
                        console.error(err)
                        throw new CustomError({
                            name: 'RedisPublishError',
                            status : 400,
                            message : 'message with id' + notificationid+ 'could not be published',
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
            next();
        })
        
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

