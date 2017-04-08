const UserModel = require('../model/UserModel');

module.exports = (req, res, next) => {
    if (req.url == '/login' || req.url == '/login/check') {
        return next();
    }

    if (!req.cookies.mongo) {
        return res.redirect('/login');
    }

    UserModel.find({ token: req.cookies.mongo })
        .lean()
        .exec((err, user) => {
            console.log('arguments', arguments);
            if (err || !user) {
                console.error(err);
                return res.redirect('/login');
            }
            next();
        });
};