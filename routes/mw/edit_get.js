// a middleware that starts a render object
let dbLists = require('../../lib/db_lists');

module.exports = [
    // set up a standard render object
    require('./render_obj'),

    // make sure we are using the edit layout
    function (req, res, next) {

        // use edit layout
        req.rend.layout = 'edit';

        next();

    },

    // render list of lists, if no listId is given in the query string
    function (req, res, next) {

        if (req.query.l === undefined) {

            dbLists.readLists().then(function (lists) {

                req.rend.lists = lists.get('lists').value();
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

];
