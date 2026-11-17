var express = require('express');
var router = express.Router();
let Event = require("../models/event")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('event page response');
});

module.exports = router;