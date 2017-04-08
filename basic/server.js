// Load modules.
const http = require('http');
const port = 9999;

const order = {
    __proto__: new Array,
    createDate: '2017-03-22 11:22:33',
    user: 44
};

order.push({
    name: 'vasaló',
    price: 5261
});

class Person {
    constructor(name) {
        this.name = name;
    };
    greet() {
        console.log(`Hello, my name is ${this.name}!`);
    };
}

class User extends Person {
    constructor(name) {
        super(name);
        this.isLoggedIn = true;
    }
};

const pali = new User('Pali');




const server = http.createServer((req = {}, res = {}) => {
    let data = JSON.stringify(order, null, 4);
    let content = `<pre>
        ${data}
    </pre>
    ${pali.greet()}`;


    res.end(content);
});

server.listen(port);