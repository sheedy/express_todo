// a middleware that starts a render object


module.exports = function (req, res, next) {

    req.rend = {

        main: 'index', // main ejs file to use in the root of the theme
        layout: 'index', // layout ejs file to use

        listId: null,
        itemId: null,
        lists: [],
        list: {},
        item: {}

    };

    next();

};
