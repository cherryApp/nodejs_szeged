// Load modules.
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 9999;

const runLog = (req) => {
    let log = `URL: ${req.url}, Method: ${req.method}, Time: ${new Date()}`;
    console.log(log);
};

const getFile = (filePath) => {
    let fileExt = ['jpg', 'jpeg', 'png', 'woff', 'woff2', 'ttf', 'eot', 'doc', 'docx'];
    let ext = path.extname(filePath).replace('.', '').toLowerCase();
    console.log('ext', ext);
    let encoding = fileExt.indexOf(ext) > -1 ? 'binary' : 'utf8';

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, content) => {
            if (err) {
                return reject(err);
            }
            return resolve({
                encoding: encoding,
                content: content
            });
        });
    });
};

const getHandler = (req, res) => {
    console.log('cookie', req.headers.cookie);
    let filePath = req.url == '/' ? './view/index.html' :
        path.join(__dirname, req.url);
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

const users = [];
const postHandler = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        let user = JSON.parse(body);
        users.push(user);
        console.log(users);

        res.end('User saved.');
    });






};


const server = http.createServer((req, res) => {
    runLog(req);

    switch (req.method.toLowerCase()) {
        case 'get':
            return getHandler(req, res);
            break;
        case 'post':
            return postHandler(req, res);
            break;
        default:
            res.end('Invalid request...');
    }
});

server.listen(port);