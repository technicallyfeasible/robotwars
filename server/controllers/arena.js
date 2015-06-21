'use strict';

var transform = require('./transform');
var game = require('../managers/game');

var arenaController = {

	/**
	 * Execute a complete arena setup and return a bundled result
	 */
	run: function (req, res) {
		// do validation of request
		req.checkBody('arena', 'Arena missing').notEmpty();
		req.checkBody('robots', 'Robots missing').isArray();

		var errors = req.validationErrors();
		if (errors) {
			res.status(400).send({errors: errors});
			return;
		}

		// transform request
		// convert top / right arena corner to width / height
		// convert robot heading N,E,S,W to 0-3
		var body = req.body;
		body.arena = transform.toArena(body.arena);
		body.robots = body.robots.map(transform.toRobot);

		var result = game.run(body);

		result.robots = result.robots.map(transform.toApiRobot);

		// serialize final positions of robots from arena
		res.status(200).json(result);
	}

};

module.exports = arenaController;
