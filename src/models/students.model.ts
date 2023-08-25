import mongoose, {Schema} from "mongoose"
import Gender from "../enum/gender"


const schema = new Schema({
    fullName: {type: String, required: true},
    profilePicture: {type: String, required: false, default: "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"},
    gender: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    productKey: {type:String, required: true},
    school: {},
    password: {type: String, required: true},
    dob: {type: Date, required: false}
    },
    {
        timestamps: true
    }
)

const Student = mongoose.model("Student", schema)
export default Student