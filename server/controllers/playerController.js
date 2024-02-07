const Player = require('../models/playerModel');

const playerController = {
    getAllPlayerNames: async (req, res) => {
        try {
            const players = await Player.find({}, 'name');
            res.status(200).json(players);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Get a list of decks for a specific player
    getPlayerDecks: async (req, res) => {
        try {
            const playerName = req.params.playerName;
            const player = await Player.findOne({ name: playerName }, 'decks');
            if (player) {
                res.status(200).json(player.decks);
            } else {
                res.status(404).json({ message: 'Player not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Add a new player to the database
    addPlayer: async (req, res) => {
        try {
            const newPlayer = new Player({ name: req.body.name });
            await newPlayer.save();
            res.status(201).json(newPlayer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    // Add a new deck to a specific player
    addDeckToPlayer: async (req, res) => {
        try {
            const playerName = req.params.playerName;
            const newDeck = {
                name: req.body.name,
                gamesPlayed: 0,
                firstPlace: 0,
                secondPlace: 0,
                thirdPlace: 0,
                fourthPlace: 0
            };
            const player = await Player.findOneAndUpdate(
                { name: playerName },
                { $push: { decks: newDeck } },
                { new: true, runValidators: true }
            );
            if (player) {
                res.status(200).json(player);
            } else {
                res.status(404).json({ message: 'Player not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getPlayerStatistics: async (req, res) => {
        try {
            const players = await Player.find({});
            res.status(200).json(players);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateDeckStatus: async (req, res) => {
        const { playerName } = req.params;
        const { name, activeDeck } = req.body;
        // console.log(`Updating deck status for player: ${playerName}, deck: ${name}, activeDeck: ${activeDeck}`);

        try {
            const player = await Player.findOne({ name: playerName });
            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }

            // Find the deck within the player's decks and update its active status
            const deck = player.decks.find(deck => deck.name === name);
            if (!deck) {
                return res.status(404).json({ message: 'Deck not found' });
            }

            // Update the activeDeck status
            deck.activeDeck = activeDeck;

            await player.save();

            res.status(200).json({ message: 'Deck status updated successfully', deck: deck });
        } catch (error) {
            console.log('Failed to update deck status: ', error);
            res.status(500).json({ message: 'Failed to update deck status', error: error.message });
        }
    },
    
    // deleteDeckFromPlayer: async (req, res) => {
    //     try {
    //         const { playerName, deckName } = req.params;
    //         // Find the player and remove the deck from their decks array
    //         const player = await Player.findOneAndUpdate(
    //             { name: playerName },
    //             { $pull: { decks: { name: deckName } } },
    //             { new: true }
    //         );
    //         if (!player) {
    //             return res.status(404).json({ message: 'Player not found' });
    //         }
    //         res.status(200).json(player);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },
    
}

module.exports = playerController;
