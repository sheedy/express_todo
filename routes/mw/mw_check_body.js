// check body
module.exports = function (req, res, next) {

    // body must be there,
    if (req.body) {

        //  and the body must have a mode property
        if (req.body.mode) {

            // then we are good to continue
            next();

        } else {

            // respond with no mode mess
            res.json({

                success: false,
                mess: 'no mode.',
                body: req.body

            });

        }

    } else {

        // respond with no body mess
        res.json({

            success: false,
            mess: 'no body was parsed.'

        });

    }

};
