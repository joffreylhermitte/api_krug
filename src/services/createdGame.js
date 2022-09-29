import createdGameModel from '../models/createdGame';


export default {
    add : async (data) => {
        let newGame = new createdGameModel();
        newGame.creator = data.creator;
        newGame.team1 = data.team1;
        newGame.team2 = data.team2;
        newGame.type = data.type;
        newGame.name = data.name;
        newGame.password = data.password;
        newGame.map = data.map;
        newGame.date = data.date;



        await newGame.save();

        return newGame;
    },
    addMemberTeam1: async (data,id) => {
        const game = await createdGameModel.findById(id);
        game.team1.push(data.user);

        await game.save();

        return game;
    },
    addMemberTeam2: async (data,id) => {
        const game = await createdGameModel.findById(id);
        game.team2.push(data.user);

        await game.save();

        return game;
    },
    edit: async (data,id) => {
        return await createdGameModel.findByIdAndUpdate(id, {
            name: data.name,
            type: data.type,
            map: data.map,
            date: data.date
        }, {new: true})
    },
    editPassword: async (data,id) => {
        return await createdGameModel.findByIdAndUpdate(id, {
            password: data.password,
        }, {new: true})
    },
    delete : async (gameId) =>
    {
        await createdGameModel.findByIdAndRemove( gameId);
    },
    all: async ()=>
    {
        return createdGameModel.find();
    },
    findOne: async (gameId) => {
        return await createdGameModel.findById(gameId)
    },
    findByUser: async (user) => {
        return await createdGameModel.find({user: user})
    }
}
