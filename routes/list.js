let express = require('express'),
path = require('path'),
listApp = module.exports = express();

listApp.get('/list', function (req, res) {

    res.json({
        mess: 'foo'
    });

});

listApp.use(require('body-parser').json());
listApp.post('/list', function (req, res) {

    console.log(req.body);

    res.json({

        mess: 'hello',
        body: req.body

    });

});
