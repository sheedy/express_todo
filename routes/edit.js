
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
                list: list.value()
            });

        });

    }

});

// POST
editApp.use(require('body-parser').json());
editApp.post('/edit',

    // check body
    require('../lib/mw_check_body.js'),

    // get list
    require('../lib/mw_get_list.js'),

    // add item?
    require('../lib/mw_add_list_item.js'),

    // get item?
    require('../lib/mw_get_list_item.js'),

    // fail
    function (req, res) {

    res.json({

        success: false,
        mess: 'post recived, but nothing happended',
        body: res.body

    })

});

module.exports = function (obj) {

    // set views from main app
    editApp.set('views', obj.app.get('views'));

    return editApp;

};
