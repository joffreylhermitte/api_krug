import mongoose from 'mongoose';

const createdGameSchema = mongoose.Schema({
    creator: String,
    team1: [{
        type: String
    }],
    team2: [{
        type: String
    }],
    type: String,
    name: String,
    password: String,
    map: String,
    date: Date

});

export default mongoose.model('CreatedGame', createdGameSchema);
