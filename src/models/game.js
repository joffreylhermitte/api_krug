import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
    user: String,
    data: [{
        type: Object,
    }],

});

export default mongoose.model('Game', gameSchema);
