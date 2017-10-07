var express = require('express');
var nodemailer = require('nodemailer');
var app = express();

// define SMTP for email sending
var smtpTransport = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	auth: {
		user: "Your-Email@gmail.com",
		pass: "User-Password"
	}
});


// app routing 
app.get('/', function(req, res){
	res.sendfile('index.html');
});

app.get('/send', function(req, res){
	var mailoptions = {
		to: req.query.to,
		subject: req.query.subject,
		text: req.query.text
	}
	console.log(mailoptions);
	smtpTransport.sendMail(mailoptions, function(error, response){
		if(error){
			console.log(error);
			res.end("error");
		} else {
			console.log("Message Sent: " + response.message);
			res.end("sent");
		}
	});
});


// server starts on port 3000
app.listen(3000, function(){
	console.log("Server started on port: 3000");
	console.log(" ");
	console.log("Open your browser to:  localhost:3000");
	console.log(" ");
	console.log("-------------------------------");
	console.log(" ");	
});

