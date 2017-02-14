var express = require('express')
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var fs = require('fs');
var fse = require('fs-extra');

var upload = multer(); // for parsing multipart/form-data

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var testFolder = "C:/Users/Tomi";

function generateJson(item, isFolder) {

}

function getFiles(dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        var isFolder = fs.statSync(name).isDirectory();
        files_.push(name,isFolder);
    }
    return files_;
}

app.get('/', function (req, res) {
	res.sendFile('index.html');
});

app.post('/list', function(req,res) {
	console.dir(req.body);
	fs.readdir(testFolder, (err, files) => {
		files.forEach(file => {
			console.log(file);
		});
	});
	res.json({ "result": [ 
	    {
	        "name": "magento",
	        "rights": "drwxr-xr-x",
	        "size": "4096",
	        "date": "2016-03-03 15:31:40",
	        "type": "dir"
	    }, {
	        "name": "index.php",
	        "rights": "-rw-r--r--",
	        "size": "549923",
	        "date": "2016-03-03 15:31:40",
	        "type": "file"
	    }
	]});
})

app.listen(8080, function() {
	console.log("App is running in port 8080");
});