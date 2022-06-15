var express = require('express');
var router = express.Router();
var task = require('./task');

/* GET home page. */
router.use('/task', task);

module.exports = router;
