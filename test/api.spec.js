'use strict';

var chai = require('chai');
var assert = chai.assert;
var request = require('supertest');

var app = require('../server/server.js');
var arenaController = require('../server/controllers/arena');

describe('Arena API', function() {

	var agent;
	beforeEach(function() {
		agent = request.agent(app);
	});

	/*it('validates csrf token', function(done) {
		agent.post('/arena/run')
			.send({
				arena: { right: 5, top: 5 },
				robots: []
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(403)
			.end(function(err, res) {
				assert.isNull(err);
				assert.isArray(res.body.errors);
				assert.equal(res.body.errors.length, 1);
				assert.equal(res.body.errors[0].param, 'csrf');
				done();
			});
	});*/

	it('returns error if arena is missing', function(done) {

		agent.post('/arena/run')
			.send({
				//arena: { right: 5, top: 5 },
				robots: []
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end(function(err, res) {
				assert.isNull(err);
				assert.isArray(res.body.errors);
				assert.equal(res.body.errors.length, 1);
				assert.equal(res.body.errors[0].param, 'arena');
				done();
			});
	});

	it('returns error if robots are missing', function(done) {
		agent.post('/arena/run')
			.send({
				arena: { right: 5, top: 5 }
				//robots: []
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end(function(err, res) {
				assert.isNull(err);
				assert.isArray(res.body.errors);
				assert.equal(res.body.errors.length, 1);
				assert.equal(res.body.errors[0].param, 'robots');
				done();
			});
	});

	it('runs successfully and returns the final position', function(done) {
		agent.post('/arena/run')
			.send({
				arena: { right: 5, top: 5 },
				robots: [{
					x: 1,
					y: 2,
					dir: 'N',
					moves: 'LMLMLMLMM'
				}, {
					x: 3,
					y: 3,
					dir: 'E',
					moves: 'MMRMMRMRRM'
				}]
			})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err) return done(err);
				assert.isArray(res.body.robots);
				assert.equal(res.body.robots.length, 2);
				// test first robot
				var robot = res.body.robots[0];
				assert.equal(robot.x, 1);
				assert.equal(robot.y, 3);
				assert.equal(robot.dir, 'N');
				// test second robot
				robot = res.body.robots[1];
				assert.equal(robot.x, 5);
				assert.equal(robot.y, 1);
				assert.equal(robot.dir, 'E');
				done();
			});
	});

});
