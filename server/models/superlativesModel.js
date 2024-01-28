const mongoose = require('mongoose');

const superlativeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    }
});

const Superlatives = mongoose.model('Superlatives', superlativeSchema);

module.exports = Superlatives;
