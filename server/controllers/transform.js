'use strict';

/**
 * Prowides transformation between internal objects and request / response types
 */

var directions = {N: 0, E: 1, S: 2, W: 3};
var apiDirections = ['N', 'E', 'S', 'W'];

var transform = {
	/**
	 * Transform top / right arena coordinates to width / height
	 */
	toArena: function(apiArena) {
		return {
			width: apiArena.right + 1,
			height: apiArena.top + 1
		};
	},

	toRobot: function(apiRobot) {
		return {
			x: apiRobot.x,
			y: apiRobot.y,
			dir: directions[apiRobot.dir] || 0,
			moves: apiRobot.moves
		};
	},

	toApiRobot: function(robot) {
		return {
			x: robot.x,
			y: robot.y,
			dir: apiDirections[robot.dir],
			moves: robot.moves
		};
	}
};

module.exports = transform;
