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

        require('./mw/check_body'),

        // create a list?
        function (req, res, next) {

            if (req.body.mode === 'create') {

                dbLists.pushList({

                    name: req.body.name || 'a new list'

                }).then(function (list) {

                    res.json({
                        success: true,
                        mess: 'create a new list',
                        list: list
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

        // delete a list?
        function (req, res, next) {

            if (req.body.mode === 'delete' && req.body.listId) {

                dbLists.deleteListById(req.body).then(function () {

                    res.json({
                        success: true,
                        mess: 'list deleted',
                        body: req.body
                    });

                }).catch (function (e) {

                    res.json({
                        success: false,
                        mess: 'error deleteding list',
                        eMess: e.message,
                        body: req.body
                    });

                });

            } else {

                next();

            }

        },

        // get a list?
        function (req, res, next) {

            if (req.body.mode === 'get' && req.body.listId) {

                dbLists.getListById(req.body.listId).then(function (list) {

                    res.json({
                        success: true,
                        mess: 'got the list',
                        list: list,
                        body: req.body
                    });

                }).catch (function (e) {

                    res.json({
                        success: false,
                        mess: 'error getting list',
                        eMess: e.message,
                        list: null,
                        body: req.body
                    });

                });

            } else {

                next()

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
