var express = require('express')
var bodyParser = require('body-parser');
var explorer = require('./services/explorer');
var _settings = require('./services/setting');


var app = express();
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
	res.sendFile('index.html');
});

app.get('/download', function () {
    _settings.trace("Downloaddddd");
});

app.post('/list', function(req,res) {
	var files = explorer.getFiles(req.body.path);
	res.json( {"result" : files } );
});

app.listen(_settings.port, function() {
	_settings.log.info("App is running in port " + _settings.port);
});