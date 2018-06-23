let dbLists = require('./db_lists');

// check body
module.exports = function (req, res, next) {

    if (req.body.mode === 'add_list_item') {

        res.json({

            success: true,
            mess: 'well we are getting this far at least.'

        });

    } else {

        // else not the mode
        next();

    }

};
