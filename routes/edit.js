
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
    require('./mw/add_list_item'),

    // delete item?
    require('./mw/delete_list_item'),

    // edit item?
    require('./mw/edit_list_item'),

    // get item?
    require('./mw/get_list_item'),

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
