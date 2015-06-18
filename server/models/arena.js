var express = require('express');
var router = express.Router();

var Arena = function(width, height) {
	this.width = width;
	this.height = height;
	this.robots = [];
};
Arena.prototype.addRobot = function(x, y) {

};

module.exports = Arena;
