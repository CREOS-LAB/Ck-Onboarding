import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    content: {type: String, required: true},
    sentBy: {type: Schema.Types.ObjectId, ref: "Student"},
    // received: {type: Schema.Types.ObjectId, ref: "Student"},
    conversation: {type: Schema.Types.ObjectId, ref: "Conversation"}
},
{
    timestamps: true,
})

const Messages = mongoose.model("Messages", schema)
export default Messages;