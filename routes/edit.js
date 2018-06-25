
let express = require('express'),
dbLists = require('../lib/db_lists'),

editApp = express();

//editApp.get('/edit', require('../lib/mw_edit_get'));

editApp.get('/edit', require('./mw/edit_get'));

// POST
editApp.use(require('body-parser').json());
editApp.post('/edit',

    [
        // check body
        require('./mw/check_body'),

        // set postRes object
        require('./mw/setobj_postres'),

        // add item?
        require('./mw/item_add'),

        // delete item?
        require('./mw/item_delete'),

        // edit item?
        require('./mw/item_edit'),

        // get item?
        require('./mw/item_get'),

        // fail
        require('./mw/check_fail')]);

module.exports = function (obj) {

    // set views from main app
    editApp.set('views', obj.app.get('views'));

    return editApp;

};
