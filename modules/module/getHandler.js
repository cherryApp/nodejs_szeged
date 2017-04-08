const path = require('path');
const getFile = require('./fileHandler');

const getHandler = (req, res) => {
    console.log('cookie', req.headers.cookie);
    let filePath = '';

    switch (req.url) {
        case '/':
            filePath = './view/index.html';
            break;
        case '/newuser':
            filePath = './view/newUser.html';
            break;
        default:
            filePath = path.join(__dirname, '..', req.url);
    }

    let p1 = getFile(filePath);
    let p2 = getFile(filePath);
    let p3 = getFile(filePath);
    let p4 = getFile(filePath);
    Promise.all([p1, p2, p3, p4]).then((data) => {
        res.end(data[0].content, data[0].encoding);
    }, (err) => {
        res.statusCode = 404;
        return res.end(JSON.stringify(err));
    });
};

module.exports = getHandler;