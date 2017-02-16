var u_merge = require('utils-merge');

var default_settings = {
    "log" : {
        "file" : "logs/file-explorer.log",
        "level" : 3
    },
    "port" : 80,
    "share_folder" : "D:/Musica"
};

var fs = require('fs');
var settings_file = JSON.parse(fs.readFileSync(__dirname + '/../settings/settings.json', 'utf8'));
var settings = default_settings;
var settings = u_merge(settings,settings_file);
settings["log"] = u_merge(default_settings["log"],settings_file["log"]);



var path = require('path');
var log_dir = __dirname + "/../" + path.dirname(settings["log"]["file"]);

if (!fs.existsSync(log_dir)){
    fs.mkdirSync(log_dir);
}

var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: settings["log"]["file"] }
  ]
});

var _log = log4js.getLogger();

module.exports = {
    log:            _log,
    port:           settings["port"],
    shareFolder:    settings['share_folder']
}