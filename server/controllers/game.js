'use strict';

/**
 * Handles game mechanics
 */

var Arena = require('../models/arena');
var Robot = require('../models/robot');

var game = {

	/**
	 * Run a complete game, from setting up the arena to moving the robots to their final positions
	 * @param setup
	 */
	run: function(setup) {
		var result = {
			robots: []
		};

		// create arena and run programs
		var arena = new Arena(setup.arena.width, setup.arena.height);
		for (var i = 0; i < setup.robots.length; i++) {
			var r = setup.robots[i];
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

		return result;
	}

};

module.exports = game;
