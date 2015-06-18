var Robot = require('./robot');

var Arena = function(width, height) {
	if (width <= 0 || height <= 0) {
		throw new Error('Width and height must be greater than zero');
	}
	this.width = width;
	this.height = height;
	this.robots = [];
};
Arena.prototype.addRobot = function(robot, x, y) {
	// decorate robot with position since this is only relevant in arena context
	robot.arena = {
		x: x,
		y: y
	};
	robots.push(robot);
};
Arena.prototype.moveRobot = function(robot, movements) {
	if (!robot.arena)
		return;
	// decorate robot with position since this is only relevant in arena context
	robot.arena = {
		x: x,
		y: y
	}
};

module.exports = Arena;
