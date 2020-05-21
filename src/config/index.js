const dotenv = require('dotenv');
const envFound = dotenv.config({path:`.env`});
if(!envFound){
    throw new Error('can\'t find .env file')
}
//set NODE_ENV to devopment by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    port: parseInt(process.env.PORT,10),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    API_KEY: process.env.API_KEY,
    REDIS_HOST : process.env.REDIS_HOST,
    REDIS_PORT : process.env.REDIS_PORT,
    NAMESPACE : process.env.NAMESPACE,
    QUEUENAME1 : process.env.QUEUENAME1,
    QUEUENAME2 : process.env.QUEUENAME2
}