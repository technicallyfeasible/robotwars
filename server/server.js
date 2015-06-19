var winston = require('winston');
winston.handleExceptions(new winston.transports.File({ filename: 'logs/exceptions.log' }));

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var port = 8080;

var app = module.exports = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(require('./api'));

// serve static client content for testing in dev environment
if (process.env.NODE_ENV !== 'production')
	app.use('/dev', express.static('client'));

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
