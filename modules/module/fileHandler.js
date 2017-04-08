const fs = require('fs');
const path = require('path');

const getFile = (filePath) => {
    let fileExt = ['jpg', 'jpeg', 'png', 'woff', 'woff2', 'ttf', 'eot', 'doc', 'docx'];
    let ext = path.extname(filePath).replace('.', '').toLowerCase();
    console.log('filePath', filePath);
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

module.exports = getFile;