var winston = require('winston');
winston.handleExceptions(new winston.transports.File({ filename: 'logs/exceptions.log' }));

var express = require('express');
var cors = require('cors');

var port = 8080;
var isProduction = (process.env.NODE_ENV === "production");

var app = module.exports = express();
app.use(cors());
app.use(require('./api'));

app.start = function() {
	// start the web server
	return app.listen(port, function() {
		winston.info('API Server started');
		// let gulp know we are online so files can be watched
		if (process.send)
			process.send('online');
	});
};

// start the server if `$ node server.js`
if (require.main === module) {
	app.start();
}
