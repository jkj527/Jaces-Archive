const GameLog = require('../models/gameLogModel');


const gameLogController = {
    getAllGameLogs: async (req, res) => {
        try {
            const gameLogs = await GameLog.find({});
            res.status(200).json(gameLogs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}


module.exports = gameLogController;
