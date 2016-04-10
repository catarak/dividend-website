var express = require('express');
var app = express();
var path = require('path');

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
	res.send("cool stuff!");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});