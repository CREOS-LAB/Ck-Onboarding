import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    message: {type: String},
})

const Contact = mongoose.model("Contact", schema)
export default Contact