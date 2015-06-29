'use strict';

var Database = require('./database');

var Arena = function(width, height) {
	if (!width || width < 0 || !height || height < 0) {
		throw new Error('Width and height must be greater than zero');
	}
	this.width = width;
	this.height = height;
	this.robots = [];
};

/**
 * Place the robot in the arena
 * @param robot
 */
Arena.prototype.addRobot = function(robot) {
	// add only once
	if (this.robots.indexOf(robot) !== -1)
		return;
	this.robots.push(robot);
};

/**
 * Remove the robot from this arena
 * @param robot
 */
Arena.prototype.removeRobot = function(robot) {
	var index = this.robots.indexOf(robot);
	if (index >= 0)
		this.robots.splice(index, 1);
};

/**
 * Get a list of currently placed robots
 * @returns {Array}
 */
Arena.prototype.getRobots = function() {
	return this.robots;
};

Arena.prototype.load = function(id, done) {

};
Arena.prototype.save = function(done) {

};

module.exports = Arena;
