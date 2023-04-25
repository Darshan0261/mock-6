const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {type: String, enum: ['admin', 'user'], default: 'user'}
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = {
    UserModel
}