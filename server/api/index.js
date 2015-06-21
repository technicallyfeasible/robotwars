'use strict';

/**
 * Combines all api functions
 */

var express = require('express');
var router = express.Router();

router.use('/arena', require('./arena'));

module.exports = router;
