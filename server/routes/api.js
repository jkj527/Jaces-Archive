const express = require('express');
const statisticController = require('../controllers/statisticController');
const gameLogController = require('../controllers/gameLogController');
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


module.exports = router;
