import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    members: [{type: Schema.Types.ObjectId, ref: "Student"}]
},
{
    timestamps: true
})

const Conversations = mongoose.model("Conversations", schema);
export default Conversations;