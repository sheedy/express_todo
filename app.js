let express = require('express'),
path = require('path'),
app = express();

// use lib/conf.js to load app settings from conf.yaml
require('./lib/conf.js')(app, __dirname).then(function () {

    // static paths for all themes
    app.use('/js', express.static('public/js'));

    // static paths for current theme
    app.use('/theme/js', express.static(path.join(__dirname, 'themes', app.get('theme'), 'js')));

    // use /list path
    app.use(require('./routes/list'));

    // main render
    app.get('/', function (req, res) {

        res.render('index');

    });

    // start listening
    app.listen(app.get('port'), function () {

        console.log('express_todo is live.');
        console.log('port: ' + app.get('port'));
        console.log('theme: ' + app.get('theme'));

    });

}).catch (function (e) {

    console.log(e.message);

});
