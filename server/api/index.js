'use strict';

/**
 * Combines all api functions
 */

var express = require('express');
/* eslint-disable new-cap */
var router = express.Router();
/* eslint-enable new-cap */

router.use('/arena', require('./arena'));

module.exports = router;
