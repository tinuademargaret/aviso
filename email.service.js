const redis = require('redis');
const subscriber = redis.createClient();

console.log('ready to consume');
subscriber.on('message', function (channel, message) {
 console.log('Message: ' + message + ' on channel: ' + channel + ' is arrive!');
});

subscriber.subscribe('service');

// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
    // user: 'youremail@gmail.com',
    // pass: 'yourpassword'
//   }
// });

// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
    // console.log(error);
//   } else {
    // console.log('Email sent: ' + info.response);
//   }
// }); 
