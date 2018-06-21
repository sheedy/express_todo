let express = require('express'),
app = express();

//app.set('port', 8080);

// settings
require('./lib/conf.js')(app,__dirname);

app.listen(app.get('port'), function () {

    console.log('express_todo is live.');
    console.log('port: ' + app.get('port'));

});
