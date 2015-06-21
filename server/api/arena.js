'use strict';

var express = require('express');
/* eslint-disable new-cap */
var router = express.Router();
/* eslint-enable new-cap */

var transform = require('./transform');
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

	// transform request
	// convert top / right arena corner to width / height
	// convert robot heading N,E,S,W to 0-3
	var body = req.body;
	body.arena = transform.toArena(body.arena);
	body.robots = body.robots.map(transform.toRobot);

	var result = game.run(body);

	// serialize final positions of robots from arena
	res.status(200).json(result);
});

module.exports = router;
