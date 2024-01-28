const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deckSchema = new Schema({
    name: { type: String, required: true },
    gamesPlayed: { type: Number, default: 0 },
    firstPlace: { type: Number, default: 0 },
    secondPlace: { type: Number, default: 0 },
    thirdPlace: { type: Number, default: 0 },
    fourthPlace: { type: Number, default: 0 }
  });
  
  const playerSchema = new Schema({
    name: { type: String, required: true },
    decks: [deckSchema]
  });
  
  const Statistics = mongoose.model('Statistics', playerSchema);
  
  module.exports = Statistics;
