var express = require('express');
var router = express.Router();
var path = require('path');
const config = require('../config');
const fs = require('fs');
const _ = require('lodash');

/* GET home page. */
router.get('/:fileName', function(req, res, next) {
    let filePath = path.join(config.rootPath, 'json', req.params.fileName + '.json');
    res.sendFile(filePath);
});

router.get('/:fileName/:id', function(req, res, next) {
    let filePath = path.join(config.rootPath, 'json', req.params.fileName + '.json');
    findRecordInFile(filePath, { id: req.params.id })
        .then((user) => {
            res.json(user.record);
        }, (e) => {
            let err = new Error('Json File Not Found');
            err.status = 404;
            next(err);
        });
});

// Update user.
router.post('/:fileName/:id', (req, res, next) => {
    console.log(req.body);
    let filePath = path.join(config.rootPath, 'json', req.params.fileName + '.json');
    findRecordInFile(filePath, { id: req.params.id })
        .then((user) => {
            let record = user.record[0];
            console.log('user', user);
            console.log('req.body', req.body);
            for (let k in req.body) {
                if (k == 'id') {
                    continue;
                }
                record[k] = req.body[k];
            }
            console.log('record', record);

            user.table[user.index] = record;
            fs.writeFileSync(filePath, JSON.stringify(user.table), 'utf8');
            res.send('User saved.');
        }, (e) => {
            let err = new Error('Json File Not Found');
            err.status = 404;
            next(err);
        });
});

// Find record in file.
const findRecordInFile = (filePath, options = {}) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (fileError, content) => {
            if (fileError) {
                return reject(fileError);
            } else {
                content = JSON.parse(content);
                let lastIndex = 0;
                let user = _.filter(content, (obj, ind) => {
                    for (let k in options) {
                        if (options[k] == obj[k]) {
                            lastIndex = ind;
                            return true;
                        }
                    }
                    return false;
                });
                resolve({
                    record: user,
                    index: lastIndex,
                    table: content
                });
            }
        });
    });
};

module.exports = router;