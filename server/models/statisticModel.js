const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://jkjohnson1996:<password>@cluster1.i5vk9vv.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

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
