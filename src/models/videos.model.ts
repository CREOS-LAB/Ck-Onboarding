import mongoose, {Schema, Types} from "mongoose"

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    link: {type: String, required: true},
    collectionRelation: {type: Schema.Types.ObjectId, ref: "Collections", required: false},
    views: {type: Number, default: 0},
    watched: {type: Number, default: 0},
    cover: {type: String, required: true},
    maxAge: {type: Number, required: false},
    minAge: {type: Number, required: false},
    category: {type: String, required: true},
},
{
    timestamps: true
})

const Videos = mongoose.model("Videos", schema)
export default Videos