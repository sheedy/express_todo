let dbLists = require('./db_lists');

// check body
module.exports = function (req, res, next) {

    if (req.body.mode === 'add_list_item' && req.body.item && req.body.listId) {

        dbLists.pushItem(req.body).then(function () {

            res.json({

                success: true,
                mess: 'item added to db',
                body: req.body

            });

        }).catch (function (e) {

            res.json({

                success: false,
                mess: 'error writing item to db',
                eMess: e.message

            });

        });

    } else {

        // else not the mode
        next();

    }

};
