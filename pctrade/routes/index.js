var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let user = [{ "name": "Pisti", "address": "Szeged" }, { "name": "Sanyi", "address": "New Delhi" }, { "name": "Nagy Péter", "address": "Szeged" }, { "name": "Zsolti", "address": "Szeged" }];
    res.render('index', { title: 'Express', user: user });
});

module.exports = router;