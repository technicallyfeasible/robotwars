'use strict';

var express = require('express');
/* eslint-disable new-cap */
var router = express.Router();
/* eslint-enable new-cap */

var arenaController = require('../controllers/arena');

/**
 * Execute a complete arena setup and return a bundled result
 */
router.post('/run', arenaController.run);

module.exports = router;
