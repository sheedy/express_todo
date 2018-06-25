let dbLists = require('../../lib/db_lists');

// create a list
module.exports = function (req, res, next) {

    if (req.body.mode === 'create') {

        dbLists.pushList({

            name: req.body.name || 'a new list'

        }).then(function (list) {

            req.postRes.success = true;
            req.postRes.mess = 'cretaed a new list';
            req.postRes.list = list;
            res.json(req.postRes);

        }).catch (function (e) {

            req.postRes.mess = 'error with database.';
            req.postRes.eMess = e.message;
            res.json(req.postRes);

        });

    } else {

        next();

    }

};
