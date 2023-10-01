import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    video : {type: Schema.Types.ObjectId, ref: "Video"},
    student: {type: Schema.Types.ObjectId, ref: "Video"},
    level: {type: Number, default: 0},
},{
    timestamps: true
})

const MyVideo = mongoose.model("MyVideo", schema)
export default MyVideo;