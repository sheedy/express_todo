// a middleware that starts a render object
module.exports = function (req, res, next) {

    // set defaults for an standard object
    // that will be send back for a post
    // request
    req.postRes = {
        success: false,
        body: req.body,
        mess: '',
        eMess: '',
        list: [],
        item: {}
    };

    next();

};
