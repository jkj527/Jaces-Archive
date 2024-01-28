const Superlative = require('../models/superlativesModel');

const superlativesController = {
    // Get all superlatives
    getAllSuperlatives: async (req, res) => {
        try {
            const superlatives = await Superlative.find({});
            res.status(200).json(superlatives);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Add a new superlative
    addSuperlative: async (req, res) => {
        try {
            const newSuperlative = new Superlative({ name: req.body.name });
            await newSuperlative.save();
            res.status(201).json(newSuperlative);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Increment superlative count
    incrementSuperlativeCount: async (req, res) => {
        try {
            const superlative = await Superlative.findOneAndUpdate(
                { name: req.params.name },
                { $inc: { count: 1 } },
                { new: true }
            );
            res.status(200).json(superlative);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Decrement superlative count
    decrementSuperlativeCount: async (req, res) => {
        try {
            const superlative = await Superlative.findOneAndUpdate(
                { name: req.params.name },
                { $inc: { count: -1 } },
                { new: true }
            );
            res.status(200).json(superlative);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};


module.exports = superlativesController;
