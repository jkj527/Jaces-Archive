const express = require('express');
const statisticController = require('../controllers/statisticController');
const gameLogController = require('../controllers/gameLogController');
const playerController = require('../controllers/playerController');
const superlativesController = require('../controllers/superlativesController');
const router = express.Router();

// Route to get all statistics
router.get('/statistics', statisticController.getAllStatistics);

// Route to create a new statistic entry - DON'T NEED
// router.post('/statistics', statisticController.createStatistic);

// Route to update a statistic entry - DON'T NEED
// router.put('/statistics/:id', statisticController.updateStatistic);

// Route to delete a statistic entry - DON'T NEED
// router.delete('/statistics/:id', statisticController.deleteStatistic);

// Route to get all game logs
router.get('/game-log', gameLogController.getAllGameLogs);

// Route to get all player names
router.get('/players', playerController.getAllPlayerNames);

// Route to get decks for a specific player
router.get('/players/:playerName/decks', playerController.getPlayerDecks);

// Route to add a new player
router.post('/players', playerController.addPlayer);

// Route to add a deck to a specific player
router.post('/players/:playerName/decks', playerController.addDeckToPlayer);

// Route to get all superlatives
router.get('/superlatives', superlativesController.getAllSuperlatives);

// Route to add a new superlative
router.post('/superlatives', superlativesController.addSuperlative);

// Route to increment a superlative's count
router.patch('/superlatives/:name/increment', superlativesController.incrementSuperlativeCount);

// Route to decrement a superlative's count
router.patch('/superlatives/:name/decrement', superlativesController.decrementSuperlativeCount);


module.exports = router;
