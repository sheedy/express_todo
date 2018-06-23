
let express = require('express'),

editApp = express();

editApp.get('/edit', function(req, res) {

    res.render('index', {
        layout: 'edit',
        listId: req.query.l || null
    });

});

module.exports = function (obj) {

    // set views from main app
    editApp.set('views',obj.app.get('views'));

    return editApp;

};
