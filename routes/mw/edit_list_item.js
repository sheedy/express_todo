let dbLists = require('../../lib/db_lists');

// edit list item middleware
module.exports = function (req, res, next) {

    if (req.body.mode === 'edit_list_item') {

        if (req.body.listId && req.body.itemId) {

            dbLists.editItemById(req.body).then(function () {

                res.json({

                    success: true,
                    mess: 'yes this is edit item',
                    body: req.body

                });

            }).catch (function (e) {

                res.json({

                    success: false,
                    mess: 'error editing item',
                    eMess: e.message,
                    body: req.body

                });

            });

        }

    } else {

        // not the mode
        next();

    }

};
