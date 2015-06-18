var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res) {
	res.set('Content-Type', 'text/text');
	res.status(200);
	res.send('id: ' + req.params.id);
});

module.exports = router;
