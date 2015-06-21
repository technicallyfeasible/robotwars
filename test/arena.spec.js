'use strict';

var chai = require('chai');
var assert = chai.assert;
var Arena = require('../server/models/arena');
var Robot = require('../server/models/robot');

describe('Arena', function() {

	it('should be initialized with size', function() {
		var arena = new Arena(4, 5);
		assert.equal(arena.width, 4);
		assert.equal(arena.height, 5);
	});

	it('should not allow zero sizes', function() {
		chai.expect(function() {
			new Arena(0, 5);
		}).to.throw();
		chai.expect(function() {
			new Arena(2, 0);
		}).to.throw();
	});

	it('should not allow empty sizes', function() {
		chai.expect(function() {
			new Arena(5, null);
		}).to.throw();
		chai.expect(function() {
			new Arena(null, 5);
		}).to.throw();
	});

	it('should not allow negative sizes', function() {
		chai.expect(function() {
			new Arena(-1, 5);
		}).to.throw();
		chai.expect(function() {
			new Arena(2, -5);
		}).to.throw();
	});

});
