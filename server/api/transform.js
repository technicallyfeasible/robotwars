/**
 * Prowides transformation between internal objects and request / response types
 */

var directions = {N: 0, E: 1, S: 2, W: 3};

var transform = {
	/**
	 * Transform top / right arena coordinates to width / height
	 */
	toArena: function(reqArena) {
		return {
			width: reqArena.right + 1,
			height: reqArena.top + 1
		};
	},

	toRobot: function(reqRobot) {
		return {
			x: reqRobot.x,
			y: reqRobot.y,
			dir: directions[reqRobot.dir] || 0,
			moves: reqRobot.moves
		};
	}
};

module.exports = transform;
