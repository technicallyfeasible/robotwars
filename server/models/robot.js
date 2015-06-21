'use strict';

// movement table based on facing direction
var movement = [
	{x: 0, y: 1},	// North
	{x: 1, y: 0},	// East
	{x: 0, y: -1},	// South
	{x: -1, y: 0}	// West
];

var Robot = function(name) {
	this.name = name;
	this.arena = null;
};

/**
 * Place the robot in an arena
 * @param arena
 * @param x
 * @param y
 * @param dir
 */
Robot.prototype.place = function(arena, x, y, dir) {
	// remove robot from current arena
	this.remove();
	// store data relevant to arena
	this.arena = {
		arena: arena,
		x: x,
		y: y,
		dir: dir	// 0: N, 1: E, 2: S, 3: W
	};
	arena.addRobot(this);
};

/**
 * Remove the robot from the arena
 */
Robot.prototype.remove = function() {
	// can only remove from the current arena
	if (!this.arena || !this.arena.arena)
		return;
	this.arena.arena.removeRobot(this);
	this.arena = null;
};

/**
 * Move the robot according to the program
 * @param commands
 */
Robot.prototype.move = function(commands) {
	var arena = this.arena;
	if (!arena) {
		throw new Error('Robot is not part of an arena');
	}
	for (var i = 0; i < commands.length; i++) {
		var c = commands.charAt(i);
		switch(c) {
			case 'L':
				arena.dir--;
				arena.dir &= 3;
				break;
			case 'R':
				arena.dir++;
				arena.dir &= 3;
				break;
			case 'M':
				var m = movement[arena.dir];
				arena.x += m.x;
				arena.y += m.y;
				if (arena.x < 0) arena.x = 0;
				if (arena.x >= arena.arena.width) arena.x = arena.arena.width - 1;
				if (arena.y < 0) arena.y = 0;
				if (arena.y >= arena.arena.height) arena.y = arena.arena.height - 1;
				break;
			default:
				throw new Error('Unknown command: ' + c);
		}
	}
};

module.exports = Robot;
