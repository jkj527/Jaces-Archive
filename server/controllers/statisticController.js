const Statistics = require('../models/statisticModel');

const statisticController = {
    getAllStatistics: async (req, res, next) => {
        try {
            const statistics = await Statistics.find({});
            res.status(200).json(statistics);
        } catch (err) {
            next(err);
        }
    },

    createStatistic: async (req, res, next) => {
        try {
            const newStatistic = new Statistics(req.body);
            const savedStatistic = await newStatistic.save();
            res.status(201).json(savedStatistic);
        } catch (err) {
            next(err);
        }
    },

    updateStatistic: async (req, res, next) => {
        try {
            const updatedStatistic = await Statistics.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(updatedStatistic);
        } catch (err) {
            next(err);
        }
    },

    deleteStatistic: async (req, res, next) => {
        try {
            await Statistics.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Statistic deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = statisticController;
