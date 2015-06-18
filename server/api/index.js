/**
 * Created by Jens on 17.06.2015.
 */

var express = require('express');
var router = express.Router();

router.use('/robot', require('./robot'));

module.exports = router;
