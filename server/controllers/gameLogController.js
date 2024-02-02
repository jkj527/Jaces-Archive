const GameLog = require('../models/gameLogModel');
const Player = require('../models/playerModel');

const gameLogController = {
    getAllGameLogs: async (req, res) => {
        try {
            const gameLogs = await GameLog.find({});
            res.status(200).json(gameLogs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // addGameLog: async (req, res) => {
    //     try {
    //         // Assuming the body contains an array of games with all details as per the updated schema
    //         const { date, games } = req.body;

    //         // Validate or transform data as needed here

    //         const newGameLog = new GameLog({
    //             date,
    //             games // This directly uses the structured games array from the request
    //         });

    //         await newGameLog.save();
    //         res.status(201).json(newGameLog);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },

    submitGameAndUpdateStats: async (req, res) => {
        const { date, games, winner, secondPlace, thirdPlace, fourthPlace, winningPlay, interestingPlays, mvp, otherNotes, roundsToWin } = req.body;

        // Prepare the game log entry
        const newGameLogEntry = new GameLog({
            date,
            games, // Assuming 'games' is structured correctly for your schema
            winner, // This might need adjustment depending on your data structure
            secondPlace,
            thirdPlace,
            fourthPlace,
            winningPlay,
            interestingPlays,
            mvp,
            otherNotes,
            roundsToWin,
        });
    
        try {
            await newGameLogEntry.save(); // Save the new game log entry
    
            // Update deck statistics for each placement
            // This is a simplified approach; you might need to adjust it based on your actual data structure
            const placements = [winner, secondPlace, thirdPlace, fourthPlace];
    
            for (const placement of placements) {
                if (placement && placement.player && placement.deck) {
                    // Find the player document that contains the deck
                    const player = await Player.findOne({ "name": placement.player, "decks.name": placement.deck });
    
                    if (player) {
                        const deckIndex = player.decks.findIndex(deck => deck.name === placement.deck);
                        if (deckIndex !== -1) {
                            // Update statistics based on placement
                            player.decks[deckIndex].gamesPlayed += 1;
    
                            if (placement === winner) player.decks[deckIndex].firstPlace += 1;
                            if (placement === secondPlace) player.decks[deckIndex].secondPlace += 1;
                            if (placement === thirdPlace) player.decks[deckIndex].thirdPlace += 1;
                            if (placement === fourthPlace) player.decks[deckIndex].fourthPlace += 1;
    
                            await player.save(); // Save the updated player document
                        }
                    }
                }
            }
    
            res.status(201).json({ message: "Game log saved and deck statistics updated." });
        } catch (error) {
            console.error("Error submitting game and updating stats: ", error);
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = gameLogController;
