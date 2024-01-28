const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  players: [String],
  winner: String,
  deckUsed: String
});

const gameLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  games: [gameSchema]
});

const GameLog = mongoose.model('GameLog', gameLogSchema);

module.exports = GameLog;
