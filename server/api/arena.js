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
	req.checkBody('arena', 'Arena missing').notEmpty();
	req.checkBody('robots', 'Robots missing').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		res.send('There have been validation errors: ' + util.inspect(errors), 400);
		return;
	}

	var body = req.body;
	var result = {
		robots: []
	};

	// create arena and run programs
	var arena = new Arena(body.arena.width, body.arena.height);
	for (var i = 0; i < body.robots.length; i++) {
		var r = body.robots[i];
		var robot = new Robot();
		robot.place(arena, r.x, r.y, r.dir);
		robot.move(r.moves);

		// store resulting position
		result.robots.push({
			x: robot.arena.x,
			y: robot.arena.y,
			dir: robot.arena.dir
		});
	}

	// serialize final positions of robots from arena
	res.status(200).json(result);
});

module.exports = router;
