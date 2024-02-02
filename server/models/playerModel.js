const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    name: { type: String, required: true },
    activeDeck: { type: Boolean, default: true },
    gamesPlayed: { type: Number, default: 0 },
    firstPlace: { type: Number, default: 0 },
    secondPlace: { type: Number, default: 0 },
    thirdPlace: { type: Number, default: 0 },
    fourthPlace: { type: Number, default: 0 }
});

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    decks: [deckSchema]
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
