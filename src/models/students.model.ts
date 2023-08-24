import mongoose, {Schema} from "mongoose"
import Gender from "../enum/gender"

const schema = new Schema({
    fullName: {type: String, require: true},
    profilePicture: {type: String, require: false, default: "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"},
    gender: {type: Gender, require: true },
    email: {type: String, require: true, unique: true},
    productKey: {},
    school: {},
    password: {type: String, require: true},
    dob: {type: Date, require: false}
    },
    {
        timestamps: true
    }
)

const Student = mongoose.model("Student", schema)
export default Student