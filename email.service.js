const redis = require('redis');
const subscriber = redis.createClient();
const config = require('./src/config')
var nodemailer = require('nodemailer');
subscriber.subscribe('service');

console.log('ready to consume');
subscriber.on('message', function (channel, message) {
 console.log('Message: ' + message + ' on channel: ' + channel + ' is arrive!');


const notification = JSON.parse(message)
const sender = notification.sender
const recipient = notification.recipient
const msg = notification.message

console.log(config.email_address, config.email_password)

var transporter = nodemailer.createTransport({
  service: 'gmail',
  secureConnection: true,
  port: 465,
  auth: {
    user: config.email_address,
    pass: config.email_password
  },
  tls: {
    secureProtocol: "TLSv1_method"
}
});


var mailOptions = {
  from: config.email_address,
  to: recipient , 
  subject: 'Notification from '+ sender + ' on slack',
  text: msg
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}); 
});
