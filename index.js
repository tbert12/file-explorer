var express = require('express')
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var prettysize = require('prettysize');

var upload = multer(); // for parsing multipart/form-data

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var testFolder = "C:/Users/Tomi/Documents";

function generateJson(item, isFolder) {
	var stats = fs.statSync(item);
	return {
		"name": path.basename(item),
		"rights":"",
		"size":(isFolder) ? "-" : prettysize(stats["size"]),
		"date": stats["birthtime"],
		"type": (isFolder) ? "dir" : "file"
	};
}

function getFiles(dir, files_){
	dir = testFolder + dir;
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    console.log("[INFO] Readdir \"" + dir + "\"");
    for (var i in files){
        var name = dir + '/' + files[i];
        var isFolder = fs.statSync(name).isDirectory();
        console.log("[INFO] Generate JSON for \"" + name + "\"");
        files_.push( generateJson(name,isFolder) );
    }
    return files_;
}

app.get('/', function (req, res) {
	res.sendFile('index.html');
});

app.post('/list', function(req,res) {
	
	console.log("\n==================BODY==================\n");
	console.dir(req.body);
	console.log("\n==================ENDBODY==================\n");
	
	var files = getFiles(req.body.path);

	res.json( {"result" : files } );
})

app.listen(8080, function() {
	console.log("[INFO] App is running in port 8080");
});