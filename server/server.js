'use strict';

var winston = require('winston');
winston.handleExceptions(new winston.transports.File({ filename: 'logs/exceptions.log' }));

var express = require('express');
var cors = require('cors');
var csrf = require('csurf');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var Database = require('./models/database');


var port = process.env.PORT || 3000;

var csrfValue = function(req) {
	var token = (req.body && req.body._csrf)
		|| (req.query && req.query._csrf)
		|| (req.headers['x-csrf-token'])
		|| (req.headers['x-xsrf-token']);
	return token;
};

var app = module.exports = express();
app.use(cors());
/*app.use(cookieParser('my cookie secret'));
app.use(csrf({value: csrfValue, cookie: true}));
app.use(function(req, res, next) {
	res.cookie('XSRF-TOKEN', req.csrfToken());
	next();
});*/
app.use(bodyParser.json());
app.use(expressValidator({
	customValidators: {
		isArray: function(value) {
			return Array.isArray(value);
		}
	}
}));
app.use(require('./api'));

// csrf error handler
app.use(function (err, req, res, next) {
	if (err.code !== 'EBADCSRFTOKEN')
		return next(err);
	// handle CSRF token errors here
	res.status(403);
	res.send({errors: [{param: 'csrf', message: 'Invalid CSRF token'}]});
});


// serve static client content for testing in dev environment
if (process.env.NODE_ENV !== 'production')
	app.use('/dev', express.static('client'));

app.start = function() {
	// start the web server
	return app.listen(port, function() {
		winston.info('API Server started');

		// connect to database
		Database.init({url: 'mongodb://localhost:27017/robotwars'});
		Database.connect(function(err, db, done) {
			if (err)
				winston.error('Error connecting to database');
			else
				winston.info('Connected to database');

			// let gulp know we are online so files can be watched
			if (process.send)
				process.send('online');
			done();
		});
	});
};

// start the server if `$ node server.js`
if (require.main === module) {
	app.start();
}
