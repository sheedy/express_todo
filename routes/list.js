let express = require('express'),
path = require('path'),
fs = require('fs-extra'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb'),
shortId = require('shortid'),

dbLists = require('../lib/db_lists'),

listApp = express();

// GET for /list path
listApp.get('/list', function (req, res) {

    // send just a list of names, and ids
    dbLists.readLists().then(function (list) {

        res.json({
            lists: list.get('lists').value().map(function (l) {
                return {
                    name: l.name,
                    id: l.id
                }
            })
        });

    });

});

// POST for /list path
listApp.use(require('body-parser').json());
listApp.post('/list',
    [

        // check for a body
        require('./mw/check_body'),

        // set postRes object
        require('./mw/setobj_postres'),

        // create a list?
        require('./mw/list_create'),

        // delete a list?
        require('./mw/list_delete'),

        // get a list?
        require('./mw/list_get'),

        // fail
        require('./mw/check_fail')

    ]);

// export a list app
module.exports = function (obj) {

    listApp.set('dir_root', obj.dir_root || process.cwd());
    listApp.set('path_lists', path.join(listApp.get('dir_root'), 'db', 'lists.json'));

    // ensure db folder
    dbLists.ensureDB();

    return listApp;

};
