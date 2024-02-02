const express = require('express');
const gameLogController = require('../controllers/gameLogController');
const playerController = require('../controllers/playerController');
const superlativesController = require('../controllers/superlativesController');
const router = express.Router();

// Route to get all game logs
router.get('/game-log', gameLogController.getAllGameLogs);

// Route for submitting a game and updating deck stats
router.post('/game-log', gameLogController.submitGameAndUpdateStats);

// Route to get all player names
router.get('/players', playerController.getAllPlayerNames);

// Route to get decks for a specific player
router.get('/players/:playerName/decks', playerController.getPlayerDecks);

// Route to add a new player
router.post('/players', playerController.addPlayer);

// Route to add a deck to a specific player
router.post('/players/:playerName/decks', playerController.addDeckToPlayer);

// Route to get all player statistics
router.get('/statistics', playerController.getPlayerStatistics);

// Route to get all superlatives
router.get('/superlatives', superlativesController.getAllSuperlatives);

// Route to add a new superlative
router.post('/superlatives', superlativesController.addSuperlative);

// Route to increment a superlative's count
router.patch('/superlatives/:name/increment', superlativesController.incrementSuperlativeCount);

// Route to decrement a superlative's count
router.patch('/superlatives/:name/decrement', superlativesController.decrementSuperlativeCount);


module.exports = router;
