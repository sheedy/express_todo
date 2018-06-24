let dbLists = require('./db_lists');

// check body
module.exports = function (req, res, next) {

    if (req.body.mode === 'delete_list_item') {

        if (req.body.listId && req.body.itemId) {

           
            dbLists.getItemById(req.body).then(function (item) {

            res.json({

                success: true,
                mess: 'this would be deleted if I had a method to call'

            });

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
            mess: 'must give a list, and item id in the body'

        });

    }

}
else {

    // not the mode
    next();

}

};
