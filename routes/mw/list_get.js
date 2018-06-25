let dbLists = require('../../lib/db_lists');

// get a list
module.exports = function (req, res, next) {

    if (req.body.mode === 'get' && req.body.listId) {

        dbLists.getListById(req.body.listId).then(function (list) {

            req.postRes.success = true;
            req.postRes.mess = 'got the list.';
            req.postRes.list = list;
            res.json(req.postRes);

        }).catch (function (e) {

            req.postRes.mess = 'error getting the list.';
            req.postRes.eMess = e.message;
            res.json(req.postRes);

        });

    } else {

        next()

    }

};
