const mongoose = require('mongoose');
const config = require('./config');
const DB_USER = config.DB_USER;
const DB_PASSWORD = config.DB_PASSWORD;
const DB_NAME = config.DB_NAME;
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-diuvg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(client => console.log('connected to database'))
.catch(error => {
    console.error('sorry an error occured while connecting to ' + url  +' ' + error)
    process.exit();
})


