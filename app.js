var express = require('express');
var app = express();
var path = require('path');
var transaction;

var util = require('util');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

app.use(express.static('public'));

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/transactions', function(req, res) {
	var address = req.body.address;
	//validate address
	console.log(address);
	transaction = spawn('./yes.exp', [address]);
	transaction.stdout.on('data', function (data) {
	  console.log(data);
	});

	// transaction.stderr.on('data', function (data) {
	//   console.log('stderr: ' + data);
	// });

	// transaction.on('exit', function (code) {
	//   console.log('child process exited with code ' + code);
	// });
	res.send("cool stuff!");
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});