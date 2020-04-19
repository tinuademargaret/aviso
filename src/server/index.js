const routes = require('../routes');
const cors =  require('cors');
const bodyParser =  require('body-parser');
const redis = require('redis');
const client = redis.createClient();


function startServer(app){
    //mount third party middleware on app
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    client.on('connect', function(){
        console.log('connected to redis')
    });
    client.on('error', function(err){
        console.log('error connecting to redis' + err)
    });
    //mount the parent route on app
    app.use('/', routes);

    //do other interesting thing to the app
}

module.exports = startServer;