

module.exports = function (obj) {

    return function (req, res) {

        res.render('index', {
            layout: 'edit',
            listId: req.query.l || null
        });

    }

};
