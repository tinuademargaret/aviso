const express = require('express');
const config  = require('./config/index');
const app = express();
const db = require('./config/db.config');
const server = require('./server');

server(app);
db();
app.listen(config.port,  err => {
    if (err) {
        console.log('################################################')
        console.log(' 🚫🚫 Error occured while trying to start server 🚫🚫', err)
        console.log('################################################')
        process.exit(1);
        return;
    }
    console.log('################################################')
    console.log(' 🛡️  Server listening on port: ', config.port, ' 🛡️ ')
    console.log('################################################')
})

