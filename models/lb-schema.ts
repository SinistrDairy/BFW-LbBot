import mongoose, {Schema} from 'mongoose'

const reqString = {type: String, required: true}

const leaderBoard = new Schema ({

    _id: reqString,
    channelID: reqString,
})

const name = 'leaderboard'

export default mongoose.models[name] || mongoose.model(name, leaderBoard)