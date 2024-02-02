const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameDetailsSchema = new Schema({
    players: [String], // List of players in the game
    winner: String, // Winner of the game
    secondPlace: String, // Optional: Second place player
    thirdPlace: String, // Optional: Third place player
    fourthPlace: String, // Optional: Fourth place player
    deckUsed: String, // Deck used by the winner
    winningPlay: { type: String, default: '' }, // The play that won the game
    interestingPlays: { type: String, default: '' }, // Notable plays during the game
    mvp: { type: String, default: '' }, // Most valuable player (if any)
    otherNotes: { type: String, default: '' }, // Any other notes about the game
    roundsToWin: { type: Number, default: 0 }, // Number of rounds to win the game
});

const gameLogSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    games: [gameDetailsSchema] // Array of games played on this date
});

const GameLog = mongoose.model('GameLog', gameLogSchema);

module.exports = GameLog;
