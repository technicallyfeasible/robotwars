var winston = require('winston');
var express = require('express');
var router = express.Router();

var Arena = require('../models/arena');
var Robot = require('../models/robot');

/**
 * Execute a complete arena setup and return a bundled result
 */
router.post('/run', function arenaRun(req, res) {
	// do validation of request
	req.checkBody('arena', 'Arena missing').notEmpty().isObject();

	var errors = req.validationErrors();
	if (errors) {
		res.send('There have been validation errors: ' + util.inspect(errors), 400);
		return;
	}

	// create arena and run programs
	var arena = new Arena();

	// serialize final positions of robots from arena
	res.send(req.body);
});

module.exports = router;
