let express = require('express'),
app = express();

app.set('port', 8080);

app.listen(app.get('port'), function () {

    console.log('express_todo is live.');
    console.log('port: ' + app.get('port'));

});
