const mongoose = require('mongoose');
// const config = require('./config');
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-diuvg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

module.exports = ()=>{
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
        if (err){
        console.error('sorry an error occured while connecting to ' + url  +' ' + err)
        }
    })

    mongoose.connection.on('connected', ()=>{
        console.log('connected to database')
    } )

    mongoose.connection.on('disconnected', ()=>{
        console.log('connection to database has been lost')
    })
    
    
    // .then(client => console.log('connected to database'))
// .catch(error => {
    // console.error('sorry an error occured while connecting to ' + url  +' ' + error)
    // process.exit();
// })


}


