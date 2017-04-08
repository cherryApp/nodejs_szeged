const getFile = require('./fileHandler');
const fs = require('fs');
const path = require('path');

const baseRegex = /^\/api\/([^\/]*)$/;
const idRegex = /^\/api\/([^\/]*)\/([^\/]*)$/;


const run = (req, res) => {
    if (baseRegex.test(req.url)) {
        let parts = req.url.match(baseRegex);
        let filePath = path.join('./json', parts[1] + '.json');
        // 
        getFile(filePath)
            .then((data) => {
                res.end(data.content);
            }, (err) => {
                res.end(JSON.stringify(err));
            });
    } else if (idRegex.test(req.url)) {
        let parts = req.url.match(idRegex);
        let table = parts[1];
        let filePath = path.join('./json', table + '.json');
        let id = parts[2];
        if (id == 'new') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                let content = fs.readFileSync(filePath, 'utf8');
                content = JSON.parse(content);
                content.push(JSON.parse(body));
                fs.writeFileSync(filePath, JSON.stringify(content), 'utf8');
                res.end('New user saved.');
            });
        }
    }
};


module.exports = {
    run: run
};