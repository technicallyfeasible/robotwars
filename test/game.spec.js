'use strict';

var chai = require('chai');
var assert = chai.assert;
var game = require('../server/managers/game');

describe('Game', function() {

	var setup;
	beforeEach(function() {
		setup = {
			arena: { width: 6, height: 6 },
			robots: [{
				x: 1,
				y: 2,
				dir: 0,
				moves: 'LMLMLMLMM'
			}, {
				x: 3,
				y: 3,
				dir: 1,
				moves: 'MMRMMRMRRM'
			}]
		};
	});

	it('can run a complete setup', function() {
		var result = game.run(setup);
		assert.isArray(result.robots);
		assert.equal(result.robots.length, 2);
	});

	it('run moves the robots as defined in the setup', function() {
		var result = game.run(setup);
		assert.equal(result.robots.length, 2);
		// test first robot
		var robot = result.robots[0];
		assert.equal(robot.x, 1);
		assert.equal(robot.y, 3);
		assert.equal(robot.dir, 0);
		// test second robot
		robot = result.robots[1];
		assert.equal(robot.x, 5);
		assert.equal(robot.y, 1);
		assert.equal(robot.dir, 1);
	});

});
