const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    age: Number,
    job: String,
    token: String
});
let User = mongoose.model('User', UserSchema);

module.exports = User;