// Load modules.
const http = require('http');
const fs = require('fs');
const path = require('path');
const getHandler = require('./module/getHandler');
const postHandler = require('./module/postHandler');
const apiModule = require('./module/apiModule');
const port = 9999;

const runLog = (req) => {
    let log = `URL: ${req.url}, Method: ${req.method}, Time: ${new Date()}`;
    console.log(log);
};

const server = http.createServer((req, res) => {
    runLog(req);

    if (/^\/api\//.test(req.url)) {
        return apiModule.run(req, res);
    }

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