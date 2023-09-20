import mongoose, {Schema} from "mongoose"
import Creator from "./creators.model";

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: false},
    class: [{type: Schema.Types.ObjectId, ref: "Classes"}],
    password: {type: String, required: true},
    profilePicture: {type: String, required: false, default: "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"},
    school: {type: Schema.Types.ObjectId, ref:"School"},
    ageRange: {type: String}
})

const Teacher = Creator.discriminator("Teacher", schema)
export default Teacher;