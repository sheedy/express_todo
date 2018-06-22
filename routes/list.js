let express = require('express'),
path = require('path'),
listApp = module.exports = express();

listApp.get('/list', function (req, res) {

    res.json({
        mess: 'foo'
    });

});
