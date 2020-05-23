const dotenv = require('dotenv');
const envFound = dotenv.config({path:`.env`});
let raw_url = new URL(process.env.REDIS_URL);
let REDIS_HOST=raw_url.hostname;
let REDIS_PORT=raw_url.port;
let REDIS_PASSWORD=raw_url.password;

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
    EMAIL_ADDRESS: process.env.E_A,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    API_KEY: process.env.API_KEY,
    REDIS_HOST : REDIS_HOST,
    REDIS_PORT : REDIS_PORT,
    REDIS_PASSWORD: REDIS_PASSWORD,
    NAMESPACE : process.env.NAMESPACE,
    QUEUENAME1 : process.env.NM,
    QUEUENAME2 : process.env.MN
}