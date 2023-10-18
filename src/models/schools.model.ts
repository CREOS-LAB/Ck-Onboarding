import mongoose, {Schema} from "mongoose"
import Gender from "../enum/gender"

const schema = new Schema({
        schoolName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        productKey: {type: String},
        password: {type: String, required: true},
        profilePicture: {type: String, required: false, default: "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"},
        resetPasswordToken: {type: String},
        resetTokenExpires: {type: Date}
    },
    {
        timestamps: true
    }
)

const School = mongoose.model("School", schema)
export default School