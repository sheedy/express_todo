
let express = require('express'),
fs = require('fs-extra'),
yaml = require('js-yaml'),
path = require('path');

// set settings for the given instance of app
module.exports = function (app, dirroot) {

    // these values should be given from the main app.js
    app = app || express();
    dirroot = dirroot || process.cwd();

    app.set('port', 8080);

    // read yaml file
    fs.readFile(path.join(dirroot, 'conf.yaml')).then(function (data) {

        console.log('okay we have it?');
        console.log(data);

    }).catch (function (e) {

        let conf = {

            port: process.env.PORT || process.argv[2] || 8080

        };

        let data = yaml.safeDump(conf);

        return fs.writeFile(path.join(dirroot, 'conf.yaml'), data, 'utf8');

    })
        .then(function (data) {

            console.log('new conf.yaml file.');

        });

};
