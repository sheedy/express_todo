let dbLists = require('../../lib/db_lists');

// delete a list
module.exports = function (req, res, next) {

    if (req.body.mode === 'delete' && req.body.listId) {

        dbLists.deleteListById(req.body).then(function () {

            req.postRes.success = true;
            req.postRes.mess = 'list deleted';
            res.json(req.postRes);

        }).catch (function (e) {

            req.postRes.mess = 'error deleteing list';
            req.postRes.eMess = e.message;
            res.json(req.postRes);

        });

    } else {

        next();

    }

};
