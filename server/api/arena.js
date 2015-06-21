'use strict';

var winston = require('winston');
var express = require('express');
var router = express.Router();

var game = require('../controllers/game');

/**
 * Execute a complete arena setup and return a bundled result
 */
router.post('/run', function arenaRun(req, res) {
	// do validation of request
	req.checkBody('arena', 'Arena missing').notEmpty();
	req.checkBody('robots', 'Robots missing').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		res.status(400).send({ errors: errors });
		return;
	}

	var result = game.run(req.body);

	// serialize final positions of robots from arena
	res.status(200).json(result);
});

module.exports = router;
