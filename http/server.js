// Load modules.
const http = require('http');
const port = 9999;

const runLog = (req) => {
    let log = `URL: ${req.url}, Method: ${req.method}, Time: ${new Date()}`;
    console.log(log);
};

const getHandler = (req, res) => {
    console.log('cookie', req.headers.cookie);
    if (req.url == '/') {
        return res.end('index page');
    } else {
        res.statusCode = 404;
        return res.end(`File: ${req.url}`);
    }
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