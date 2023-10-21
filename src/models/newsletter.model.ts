import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    email: {type: String, required: true},
},
{
    timestamps: true
})

const Newsletters = mongoose.model("Newsletters", schema);
export default Newsletters;