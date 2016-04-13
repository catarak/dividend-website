var express = require('express');
var app = express();
var path = require('path');
var transaction;

var util = require('util');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dividend');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    wallet_address: { type: String, required: true, trim: true },
    ip_address: { type: String, required: true, trim: true }
},
{
    timestamps: true
});

var User = mongoose.model('User', UserSchema);

app.use(express.static('public'));

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/favicon.ico'));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.enable('trust proxy');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/transactions', function(req, res) {
	var ipAddress = req.ip;
	var address = req.body.address;
	User.find({wallet_address: address}, function(err, results) {
		if (results.length === 0) {
			transaction = spawn('./yes.exp', [address]);
			transaction.stdout.on('data', function (data) {
			  console.log('' + data);
			});
			//somehow check if transaction is signed successfully
			var user = new User({wallet_address: address, ip_address: ipAddress});
			user.save(function(err, result) {
				if (err) {
					console.log(err);
				}
				res.send({success: true});
			});
		}
		else {
			res.send({success: false, message: "Dividend already sent."})
		}
	});
	// res.send({success: true});
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});