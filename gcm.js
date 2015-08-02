var gcm = require('node-gcm');

var message = new gcm.Message();

message.addData({
    message: "Tudo vou usar essa funçao aqgora!",
    msgcnt: Math.floor((Math.random() * 1000) + 1),
	title: "Gostei disso!"
});


// Change the message variables
message.collapseKey = 'demo';
message.delayWhileIdle = true;
message.timeToLive = 4;
//message.dryRun = true;

// Set up the sender with you API key
var sender = new gcm.Sender('AIzaSyDsMk4Ncyyvw22AVmmnZMfSl6F674Nm89I');

// Add the registration IDs of the devices you want to send to
var registrationIds = [];

// rogerio
registrationIds.push('APA91bF1AjIQ2hIn6--t2OTEckIuhjDJoEdYarHiRRMaULRqYXL-FCqraKzE5MlRHdA0CUhv_ukvgUz5yEZaIyOkGsfd6dSilVFfDVw_OT5z9STkQP-HzAkplqLmO_VbKdQ5K5KC8fKplg3z2_iRuXHdJlr3-h-CVKoVxdM0GLlJKVHo4oEarLo');

// joao
registrationIds.push('APA91bFu_lNcsSjkwXqf_ylaq11pbSl3hO7463L-x7Lo2-zjMxi1w9AE-Lgs0qi4n6que9gtSy5B9LDFQ1SKmFgVGYb_sbHNOOVHsZa6UgOXQmlLU3G4Qd7BKIAAzP3kqD7lTtAQJkNPyV95UP2mtjzamah-m7ep2Q');


sender.send(message, registrationIds, function (err, result) {
  if(err) {
  	console.error('erro'); 
	}
  else {
  console.log('nao erro');   
   console.log(result);
  }
});


