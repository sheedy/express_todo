
let express = require('express'),
dbLists = require('../lib/db_lists'),

editApp = express();

// GET
editApp.get('/edit',
    [
        // set up a render object
        require('../lib/mw_render_obj'),

        // make sure we are using the edit layout
        function (req, res, next) {

            // use edit layout
            req.rend.layout = 'edit';

            next();

        },

        // render list of lists, if no listId is given in the query string
        function (req, res, next) {

            if (req.query.l === undefined) {

                dbLists.readList().then(function (list) {

                    req.rend.lists = list.get('lists').value();
                    res.render(req.rend.main, req.rend);

                }).catch (function () {

                    res.render(req.rend.main, req.rend);

                });

            } else {

                // else we where given a list id so set the list id, and continue.
                req.rend.listId = req.query.l;
                next();

            }

        },

        // if no item id is given, just send out the list
        function (req, res, next) {

            // no item id given?
            if (req.query.i === undefined) {

                dbLists.getListById(req.query.l).then(function (list) {

                    req.rend.list = list.value();
                    res.render(req.rend.main, req.rend);

                });

            } else {

                // item id given
                req.rend.itemId = req.query.i;
                next();

            }

        },

        // get the item
        function (req, res) {

            dbLists.getItemById({

                listId: req.query.l,
                itemId: req.query.i

            }).then(function (item) {

                req.rend.item = item.value();
                res.render(req.rend.main, req.rend);

            });

        }

    ]);

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
