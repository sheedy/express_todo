let express = require('express'),
path = require('path'),
fs = require('fs-extra'),
FileSync = require('lowdb/adapters/FileSync'),
low = require('lowdb');

let listApp = express();

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

                res.json({
                    success: true,
                    mess: 'create a new list',
                    root: listApp.get('root')
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
    fs.ensureDir(path.join(listApp.get('dir_root'), 'db')).then(function () {

        var list = listApp.locals.list = low(new FileSync(listApp.get('path_lists')));

        list.defaults({
            lists: []
        }).write();

    });

    return listApp;

};
