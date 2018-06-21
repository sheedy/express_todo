let express = require('express'),
app = express();


// use lib/conf.js to load app settings from conf.yaml
require('./lib/conf.js')(app, __dirname).then(function () {
	
	app.get('/', function(req,res){
		
		res.render('index');
		
	});

    app.listen(app.get('port'), function () {

        console.log('express_todo is live.');
        console.log('port: ' + app.get('port'));
        console.log('theme: ' + app.get('theme'));

    });

}).catch (function(e) {

    console.log(e.message);

});
