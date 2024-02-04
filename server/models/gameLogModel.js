const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerAndDeckSchema = new Schema({
    player: String,
    deck: String
})

const gameDetailsSchema = new Schema({
    date: Date,
    playersAndDecks: [playerAndDeckSchema], // List of players and decks in the game
    winner: playerAndDeckSchema, // Winner of the game
    secondPlace: playerAndDeckSchema, // Optional: Second place player
    thirdPlace: playerAndDeckSchema, // Optional: Third place player
    fourthPlace: playerAndDeckSchema, // Optional: Fourth place player
    winningPlay: { type: String, default: '' }, // The play that won the game
    interestingPlays: { type: String, default: '' }, // Notable plays during the game
    mvp: { type: String, default: '' }, // Most valuable player (if any)
    otherNotes: { type: String, default: '' }, // Any other notes about the game
    roundsToWin: { type: Number, default: 0 }, // Number of rounds to win the game
});

// const gameLogSchema = new Schema({
//     date: {
//         type: Date,
//         required: true
//     },
//     games: [gameDetailsSchema] // Array of games played on this date
// });

const GameLog = mongoose.model('GameLog', gameDetailsSchema);

module.exports = GameLog;
