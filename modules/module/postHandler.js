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

module.exports = postHandler;