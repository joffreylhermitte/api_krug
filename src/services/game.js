import gameModel from '../models/game';


export default {
    add : async (data) => {
        let newGame = new gameModel();
        newGame.user = data.user;
        newGame.data = data.game;



        await newGame.save();

        return newGame;
    },
    delete : async (gameId) =>
    {
        await gameModel.findByIdAndRemove( gameId);
    },
    all: async ()=>
    {
        return gameModel.find();
    },
    findOne: async (gameId) => {
        return await gameModel.findById(gameId)
    },
    findByUser: async (user) => {
        return await gameModel.find({user: user})
    }
}
