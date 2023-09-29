import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    profilePicture: {type: String, required: false, default: "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"}
},
{
    timestamps: true
})

const Admin = mongoose.model("Admin", schema);
export default Admin;