
let express = require('express'),
dbLists = require('../lib/db_lists'),

editApp = express();

// GET
editApp.get('/edit', function (req, res) {

    if (req.query.l === undefined) {

        dbLists.readList().then(function (list) {

            res.render('index', {
                layout: 'edit',
                listId: null,
                lists: list.get('lists').value()
            });

        }).catch (function () {

            res.render('index', {
                layout: 'edit',
                listId: null,
                lists: []
            });

        });

    } else {

        dbLists.getListById(req.query.l).then(function (list) {

            res.render('index', {
                layout: 'edit',
                listId: req.query.l || null,
                lists: [],
                list: list
            });

        });

    }

});

// POST
editApp.use(require('body-parser').json());
editApp.post('/edit',

    // check body
    require('../lib/check_body.js'),

    function (req, res) {

    res.json({

        success: true,
        mess: 'post recived, but nothing happended',
        body: res.body

    })

});

module.exports = function (obj) {

    // set views from main app
    editApp.set('views', obj.app.get('views'));

    return editApp;

};
