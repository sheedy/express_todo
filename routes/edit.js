
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

        if (req.query.i === undefined) {

            dbLists.getListById(req.query.l).then(function (list) {

                res.render('index', {
                    layout: 'edit',
                    listId: req.query.l || null,
                    lists: [],
                    list: list.value()
                });

            });

        } else {

            dbLists.getItemById({

                listId: req.query.l,
                itemId: req.query.i

            }).then(function (item) {

                res.render('index', {
                    layout: 'edit',
                    listId: req.query.l || null,
                    lists: [],
                    item: item.value()
                });

            });

        }

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

    // delete item?
    require('../lib/mw_delete_list_item.js'),

    // edit item?
    require('../lib/mw_edit_list_item.js'),

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
