
let express = require('express'),
dbLists = require('../lib/db_lists'),

editApp = express();

//editApp.get('/edit', require('../lib/mw_edit_get'));

editApp.get('/edit', require('./mw/edit_get'));

// POST
editApp.use(require('body-parser').json());
editApp.post('/edit',

    // check body
    require('./mw/check_body'),

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
