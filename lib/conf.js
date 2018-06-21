
let express = require('express'),
fs = require('fs-extra'),
_ = require('lodash'),
yaml = require('js-yaml'),
path = require('path');

// set settings to the given app with the given settings object
let setWithYAML = function (app, root, yamlConf) {

    // load yaml
    let setObj = yaml.safeLoad(yamlConf.toString());

    // set settings
    _.each(setObj, function (val, key) {

        app.set(key, val);

    });

    // insure port is set to the PORT environment variable if present
    if (process.env.PORT) {

        app.set('port', process.env.PORT);

    }

    // always use ejs for now
    app.set('views', path.join(root, 'themes',app.get('theme')));
    app.set('view engine', 'ejs');

    return app;

};

// read conf.yaml
let readConf = function (app, dir) {

    return fs.readFile(path.join(dir, 'conf.yaml')).then(function (yamlConf) {

        console.log('conf.yaml found.');
        return setWithYAML(app, dir,yamlConf);

    });

};

// set settings for the given instance of app
module.exports = function (app, dirroot) {

    // these values should be given from the main app.js
    app = app || express();
    dirroot = dirroot || process.cwd();

    //app.set('port', 8080);

    // read yaml file
    return readConf(app, dirroot).catch (function (e) {

        // create new conf.yaml
        let conf = {

            port: process.env.PORT || process.argv[2] || 8080,
            theme: 'landscape'

        };

        let data = yaml.safeDump(conf);
        return fs.writeFile(path.join(dirroot, 'conf.yaml'), data, 'utf8').then(function (yamlConf) {

            console.log('new conf.yaml');

            return readConf(app, dirroot);

        });

    })

};
