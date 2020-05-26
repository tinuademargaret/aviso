const routes = require('../routes');
const cors =  require('cors');
const bodyParser =  require('body-parser');
const config = require('../config/index');
// const redis = require('redis');

const { rsmq } = require('../config/redis.config')

// const RedisSMQ = require('rsmq');
// const rsmq = new  RedisSMQ({
    // host: config.REDIS_HOST,
    // port: config.REDIS_PORT,
    // ns: config.NAMESPACE,
    // realtime: true,
    // password: config.REDIS_PASSWORD
// })
// const redisClient = redis.createClient();


function startServer(app){
    //mount third party middleware on app
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    rsmq.createQueue({qname: config.QUEUENAME1}, (err, resp) =>{
        if (err){
            if (err !== "queueExists"){
                console.error(err)
                return;
            }
            else{
                console.log('The queue exists')
            }
        }
        if (resp === 1){console.log('queue created')}
    })
    rsmq.createQueue({qname: config.QUEUENAME2}, (err, resp) =>{
        if (err){
            if (err !== "queueExists"){
                console.error(err)
                return;
            }
            else{
                console.log('The queue exists')
            }
        }
        if (resp === 1){console.log('queue created')}
    })
    // redisClient.on('connect', function(){
        // console.log('connected to redis')
    // });
    // redisClient.on('error', function(err){
        // console.log('error connecting to redis' + err)
    // });
    //mount the parent route on app
    app.use('/', routes);

    //error handlers
    app.use((err, req, res, next)=>{
        res.status(err.status || 500)
        res.json({
            error :{
                name : err.name,
                status : err.status,
                code : err.code,
                message: err.message,
                field: err.field
            }
        })
    })

    //do other interesting thing to the app
}

module.exports = startServer;