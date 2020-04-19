# Offline Notification Api
This project sends an email to a recipient to inform them that they have a message on some app. This is a common situation where you're away from your PC at work and a colleague sends you a message or some conversation is ongoing on a project which you are a part of. This service sends an email to the recipient once they get a message or a notification on some app.
Based on an Event Driven Architecture
## System Architecture
<img src='aviso architecture.png'></img>
## App Components
* A single POST end-point which takes in the body [message: some text, recipient: email address]
* A message service that receives messages via the endpoint, decrypts them, and saves them to the db
* As part of the message service, it also has an event emitter that emits events message events
* An email service that listens for events, adds new events to the queue and sends an email to the recipient of the message.
## Technologies Used
* Framework and Programming language
  * JavaScript, ES6.
  * Node.js, Express Framework.
* Database and Database client
  * Redis
  * redis
* Message Broker
  * Redis
## Author
* Tinuade Adeleke @Tinumide
## Acknowledgements
* Hats off to my mentor @mayorcoded
