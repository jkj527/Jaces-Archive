const express = require('express');
const statisticController = require('../controllers/statisticController');
const router = express.Router();

// Route to get all statistics
router.get('/statistics', statisticController.getAllStatistics);

// Route to create a new statistic entry
router.post('/statistics', statisticController.createStatistic);

// Route to update a statistic entry
router.put('/statistics/:id', statisticController.updateStatistic);

// Route to delete a statistic entry
router.delete('/statistics/:id', statisticController.deleteStatistic);

module.exports = router;
