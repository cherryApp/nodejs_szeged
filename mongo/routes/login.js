// Load modules.
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Set mongoose schema and model.
const UserModel = require('../model/UserModel');

// Create routing.
router.get('/', (req, res, next) => {
    res.render('login', { title: 'Login to system.' });
});

// Create routing.
router.post('/check', (req, res, next) => {
    UserModel.findOne({ email: req.body.email, password: req.body.password })
        .exec(function(err, user) {
            if (!err && user !== null) {
                let token = createToken();
                res.cookie('mongo', token, '/');
                user.token = token;
                user.save((err, raw) => {
                    return res.redirect('/');
                });
            } else {
                res.redirect('/login');
            }
        });
});

// Create token.
const createToken = (lgt = 20) => {
    let str = 'abcdefghijklmnoprstuvzxyABCDEFGH1234567890';
    let out = '';
    for (let i = 0; i < lgt; i++) {
        let r = Math.round(Math.random() * str.length);
        out += str.slice(r, r + 1);
    }
    return out;
}


module.exports = router;