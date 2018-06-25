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
        function (req, res, next) {

            if (req.body.mode === 'delete' && req.body.listId) {

                dbLists.deleteListById(req.body).then(function () {

                    req.postRes.success = true;
                    req.postRes.mess = 'list deleted';
                    res.json(req.postRes);

                }).catch (function (e) {

                    req.postRes.mess = 'error deleteing list';
                    req.postRes.eMess = e.message;
                    res.json(req.postRes);

                });

            } else {

                next();

            }

        },

        // get a list?
        function (req, res, next) {

            if (req.body.mode === 'get' && req.body.listId) {

                dbLists.getListById(req.body.listId).then(function (list) {

                    req.postRes.success = true;
                    req.postRes.mess = 'got the list.';
                    req.postRes.list = list;
                    res.json(req.postRes);

                }).catch (function (e) {

                    req.postRes.mess = 'error getting the list.';
                    req.postRes.eMess = e.message;
                    res.json(req.postRes);

                });

            } else {

                next()

            }

        },

        // fail
        function (req, res) {

            req.postRes.mess = 'post recived, but nothing was done. Check the given body';
            res.json(req.postRes);

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
