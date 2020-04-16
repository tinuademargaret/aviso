const routes = require('../routes');



function startServer(app){
    //mount third party middleware on app

    //mount the parent route on app
    app.use('/', routes);

    //do other interesting thing to the app
}

module.exports = startServer;