import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    cover: {type: String, required: false},
    title: {type: String, required: true},
    description: {type: String, required: true},
    numberOfVideos: {type: String, required: true},
    numberOfGems: {type: String, required: true},
    public: {type: Boolean, default: false},
    minAge: {type: Number, required: true},
    maxAge: {type: Number, required: true},
},
{
    timestamps: true
})

const Badges = mongoose.model("Badges", schema);
export default Badges;

