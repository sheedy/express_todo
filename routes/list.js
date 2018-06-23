let express = require('express'),
path = require('path'),
fs = require('fs-extra'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb'),
shortId = require('shortid'),

dbLists = require('../lib/db_lists'),

listApp = express();

/*
// ensure db folder, and default list.json
let ensureDB = function () {

    let listAdapter = new FileAsync(listApp.get('path_lists'));

    return fs.ensureDir(path.join(listApp.get('dir_root'), 'db')).then(function () {

        return low(listAdapter).then(function (list) {

            return list.defaults({
                lists: []
            }).write();

        })

    });

};

// push new list
let pushList = function (meta) {

    let listAdapter = new FileAsync(listApp.get('path_lists'));

    meta = meta || {};

    meta.name = meta.name || 'new list';

    return low(listAdapter).then(function (list) {

        return list.get('lists').push({

            name: meta.name,
            id: shortId.generate(),
            items: []

        }).write();

    });

};

// read the list
let readList = function () {

    let listAdapter = new FileAsync(listApp.get('path_lists'));

    return low(listAdapter);

};

// getListById
let getListById = function (id) {

    return readList().then(function (list) {

        return list.get('lists').find({
            id: id
        }).value();

    });

};

*/

// GET for /list path
listApp.get('/list', function (req, res) {

    // send just a list of names, and ids
    dbLists.readList().then(function (list) {

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

        // check body
        function (req, res, next) {

            // body must be there,
            if (req.body) {

                //  and the body must have a mode property
                if (req.body.mode) {

                    // then we are good to continue
                    next();

                } else {

                    // respond with no mode mess
                    res.json({

                        success: false,
                        mess: 'no mode.',
                        body: req.body

                    });

                }

            } else {

                // respond with no body mess
                res.json({

                    success: false,
                    mess: 'no body was parsed.'

                });

            }

        },

        // create a list?
        function (req, res, next) {

            if (req.body.mode === 'create') {

                dbLists.pushList({

                    name: req.body.name || 'a new list'

                }).then(function () {

                    res.json({
                        success: true,
                        mess: 'create a new list'
                    });

                }).catch (function () {

                    res.json({
                        success: false,
                        mess: 'error with database!?'
                    });

                });

            } else {

                next();

            }

        },

        // get a list by id?
        function (req, res, next) {

            if (req.body.mode === 'getlist') {

                dbLists.getListById(req.body.listId).then(function (list) {

                    res.json({

                        success: true,
                        mess: 'well there is a middeware at least',
                        id: req.body.listId,
                        list: list

                    });

                });

            } else {

                next();

            }

        },

        // add an item?
        function (req, res, next) {

            if (req.body.mode === 'additem') {

                if (req.body.listId) {

                    res.json({

                        success: true,
                        mess: ''

                    });

                } else {

                    res.json({

                        success: false,
                        mess: 'no listId given'

                    });

                }

            } else {

                next();

            }

        },

        // fail
        function (req, res) {

            res.json({

                success: false,
                mess: 'post recived, but nothing was done. Check the given body',
                body: req.body

            });

        }

    ]);

// export a list app
module.exports = function (obj) {

    listApp.set('dir_root', obj.dir_root || process.cwd());
    listApp.set('path_lists', path.join(listApp.get('dir_root'), 'db', 'lists.json'));

    // ensure db folder
    dbLists.ensureDB();

    return listApp;

};
