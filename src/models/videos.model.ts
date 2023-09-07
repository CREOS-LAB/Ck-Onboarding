import mongoose, {Schema} from "mongoose"

const schema = new Schema({
    name: {type: String, required: true},
    link: {type: String, required: true},
    collectionRelation: {type: String, required: true},
    views: {type: Number, default: 0},
    watched: {type: Number, default: 0},
},
{
    timestamps: true
})

const Videos = mongoose.model("Videos", schema)
export default Videos