import mongoose, {Schema} from 'mongoose'

const reqString = {type: String, required: true}
const uniqString = {type: String, required: true, unique: true}
const defNumber = {type: Number, default: 0}

const profileSchema = new Schema({
    houseName: uniqString,
    points: defNumber,
    serverID: reqString,
})

const name = 'profiles'

export default mongoose.models[name] || mongoose.model(name, profileSchema)