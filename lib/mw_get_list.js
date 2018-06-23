let dbLists = require('./db_lists');

// check body
module.exports = function (req, res, next) {

    if (req.body.listId) {

        dbLists.getListById(req.body.listId).then(function (list) {

            req.list = list;
            next();

        }).catch (function (e) {

            res.json({

                success: false,
                mess: 'error getting list',
                eMess: e.message

            });

        });

    } else {

        res.json({

            success: false,
            mess: 'must give a list id'

        });

    }

};
