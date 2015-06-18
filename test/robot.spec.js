var chai = require('chai');
var assert = chai.assert;
var Robot = require('../server/models/robot');
var Arena = require('../server/models/arena');

describe('Robot', function() {

	var arena;
	beforeEach(function() {
		arena = new Arena(5, 5);
	});

	it('should be initialized with a name', function() {
		var robot = new Robot('chainsaw_robot');
		assert.equal(robot.name, 'chainsaw_robot');
	});

	it('can be added to an arena', function () {
		var robot = new Robot();
		robot.place(arena, 0, 0, 0);
		assert.include(arena.robots, robot);
		assert.isObject(robot.arena);
		assert.strictEqual(robot.arena.x, 0);
		assert.strictEqual(robot.arena.y, 0);
		assert.strictEqual(robot.arena.dir, 0);
	});

	it('can be removed from an arena', function () {
		var robot = new Robot();
		robot.place(arena, 0, 0, 0);
		robot.remove();
		assert.notInclude(arena.robots, robot);
		assert.isNull(robot.arena);
	});

	it('throws on unknown commands', function () {
		var robot = new Robot();
		robot.place(arena, 2, 2, 0);
		chai.expect(function() {
			robot.move('X');
		}).to.throw(Error, 'Unknown command: X');
	});

	it('can move north', function () {
		var robot = new Robot();
		robot.place(arena, 2, 2, 0);
		robot.move('M');
		assert.strictEqual(robot.arena.x, 2);
		assert.strictEqual(robot.arena.y, 3);
	});
	it('can move east', function () {
		var robot = new Robot();
		robot.place(arena, 2, 2, 1);
		robot.move('M');
		assert.strictEqual(robot.arena.x, 3);
		assert.strictEqual(robot.arena.y, 2);
	});
	it('can move south', function () {
		var robot = new Robot();
		robot.place(arena, 2, 2, 2);
		robot.move('M');
		assert.strictEqual(robot.arena.x, 2);
		assert.strictEqual(robot.arena.y, 1);
	});
	it('can move west', function () {
		var robot = new Robot();
		robot.place(arena, 2, 2, 3);
		robot.move('M');
		assert.strictEqual(robot.arena.x, 1);
		assert.strictEqual(robot.arena.y, 2);
	});

	it('turning left after facing north, faces west', function () {
		var robot = new Robot();
		robot.place(arena, 2, 2, 0);
		robot.move('L');
		assert.strictEqual(robot.arena.x, 2);
		assert.strictEqual(robot.arena.y, 2);
		assert.strictEqual(robot.arena.dir, 3);
	});
	it('turning right after facing west, faces north', function () {
		var robot = new Robot();
		robot.place(arena, 2, 2, 3);
		robot.move('R');
		assert.strictEqual(robot.arena.x, 2);
		assert.strictEqual(robot.arena.y, 2);
		assert.strictEqual(robot.arena.dir, 0);
	});
	it('turning right after facing north, faces east', function () {
		var robot = new Robot();
		robot.place(arena, 2, 2, 0);
		robot.move('R');
		assert.strictEqual(robot.arena.x, 2);
		assert.strictEqual(robot.arena.y, 2);
		assert.strictEqual(robot.arena.dir, 1);
	});

	it('cannot move outside arena bounds', function () {
		var robot = new Robot();
		// place facing south at 0,0 and move
		robot.place(arena, 0, 0, 2);
		robot.move('M');
		assert.strictEqual(robot.arena.x, 0);
		assert.strictEqual(robot.arena.y, 0);
	});

});
