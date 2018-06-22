let express = require('express'),
path = require('path'),
listApp = module.exports = express();

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
        function () {

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
