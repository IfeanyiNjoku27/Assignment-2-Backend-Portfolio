const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        created: {type: Date, default: Date.now, immutable: true},
        updated: {type: Date, default: Date.now}
    }
);

module.exports = mongoose.model('Users', usersSchema);