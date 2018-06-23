
let express = require('express'),
dbLists = require('../lib/db_lists'),

editApp = express();

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

        res.render('index', {
            layout: 'edit',
            listId: req.query.l || null,
            lists: []
        });

    }

});

module.exports = function (obj) {

    // set views from main app
    editApp.set('views', obj.app.get('views'));

    return editApp;

};
