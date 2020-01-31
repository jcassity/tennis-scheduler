const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String
    },
    wins: {
        type: Number
    },
    losses: {
        type: Number
    }
}, {
        collection: 'players'
    })

module.exports = mongoose.model('User', userSchema)