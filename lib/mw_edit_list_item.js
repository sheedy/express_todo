let dbLists = require('./db_lists');

// edit list item middleware
module.exports = function (req, res, next) {

    if (req.body.mode === 'edit_list_item') {

        if (req.body.listId && req.body.itemId) {

            res.json({

                success: true,
                mess: 'yes this is edit item',
                body: req.body

            });

        }

    } else {

        // not the mode
        next();

    }

};
