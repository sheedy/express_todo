let express = require('express'),
path = require('path'),
fs = require('fs-extra'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb');

let listApp = express();

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
            items: []

        }).write();

    });

};

listApp.get('/list', function (req, res) {

    res.json({
        mess: 'foo'
    });

});

// respond to posts
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
                        mess: 'no mode.'

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

                pushList();

                res.json({
                    success: true,
                    mess: 'create a new list'
                });

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
    ensureDB();

    return listApp;

};
