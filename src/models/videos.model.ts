import mongoose, {Schema, Types} from "mongoose"

const schema = new Schema({
    name: {type: String, required: true},
    link: {type: String, required: true},
    collectionRelation: {type: Schema.Types.ObjectId, ref: "Collection", required: true},
    views: {type: Number, default: 0},
    watched: {type: Number, default: 0},
},
{
    timestamps: true
})

const Videos = mongoose.model("Videos", schema)
export default Videos