var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const User = require('../model/UserModel');

const saveUser = () => {
    let user = new User({
        name: 'Babóca',
        email: 'babi@gmail.com',
        address: 'Bp',
        age: 22,
        job: 'programmer'
    });

    user.save((err) => {
        if (err) {
            return console.error(err);
        }
        console.log('User saved.');
    });
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users', { title: 'Users', url: '/users' })
});

router.get('/api', function(req, res, next) {
    /* User.findOne({ name: 'Babóca' }).lean().exec(function(err, users) {
        return res.json(users);
    }); */

    User.find().lean().exec((err, data) => {
        return res.json(data);
    });
});

router.get('/api/:id', function(req, res, next) {
    User.findOne({ _id: req.params.id }).lean().exec(function(err, users) {
        return res.json(users);
    });
});

// Post, update user.
router.post('/api/:id', (req, res, next) => {
    User.update({ _id: req.params.id }, req.body, (err, raw) => {
        return res.json(raw);
    });
});

// Put, new user.
router.put('/api', (req, res, next) => {
    let user = new User(req.body);
    user.save((err) => {
        if (err) {
            return res.json(err);
        }
        res.send('User saved.');
    });
});


// Delete, delete user.
router.delete('/api/:id', (req, res, next) => {
    User.remove({ _id: req.params.id }, (err, raw) => {
        if (err) {
            return res.json(err);
        }
        res.json(raw);
    });
});

module.exports = router;