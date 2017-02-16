var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var settings = require('./setting');

module.exports = {
    _basePath : settings.shareFolder,

    generateJson: function (item, isFolder) {
        var stats = fs.statSync(item);
        var date = stats["birthtime"];
        return {
            "name": path.basename(item),
            "rights":"",
            "size":(isFolder) ? "-" : stats["size"],
            "date": date.toLocaleDateString() + " " + date.toLocaleTimeString(),
            "type": (isFolder) ? "dir" : "file"
        };
    },

    getFiles: function (dir, files_){
        dir = _basePath + dir;
        files_ = files_ || [];
        var files = fs.readdirSync(dir);
        for (var i in files){
            var name = dir + '/' + files[i];
            var isFolder = fs.statSync(name).isDirectory();
            files_.push( generateJson(name,isFolder) );
        }
        return files_;
    }
}