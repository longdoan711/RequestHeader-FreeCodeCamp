var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'public/templates'));
app.set('view engine', 'jade');
app.get('/', function(req, res) {
	var ip = req.headers["x-forwarded-for"];
  	if (ip){
    	var list = ip.split(",");
    	ip = list[list.length-1];
  	} else {
    	ip = req.connection.remoteAddress;
  	} 
	console.log('ip', ip);
	var language = req.headers['accept-language'].slice(0,5);
	var sys = req.headers['user-agent'];
	sys = sys.match(/\((.*?)\)/)[1];
	res.render('index', {
		ip: ip,
		language: language,
		sys: sys
	});
});

app.use(express.static('public'));
app.use(express.static(__dirname));
app.listen(port);