import mongoose, {Schema} from "mongoose"
import Gender from "../enum/gender"

const schema = new Schema({
    fullName: {type: String, required: true},
    profilePicture: {type: String, required: false, default: "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"},
    gender: {type: String, required: false },
    email: {type: String, required: true, unique: true},
    productKey: {type:String, required: true},
    school: {type: Schema.Types.ObjectId, ref:"School"},
    password: {type: String, required: true},
    dob: {type: Date, required: false},
    gem: {type: Number, default: 0},
    courses: [{type: Schema.Types.ObjectId, ref: "Course"}],
    hoursSpent: {type: Number},
    stage: {type: String},
    badges: {type: String},
    achievement: {type: String},
    streak: {type: Number, default: 0},
    age: {type: Number},
    last_logged_in: {type: Date},
    completedCourses: {type: Number, default: 0},
    resetPasswordToken: {type: String},
    resetTokenExpires: {type: Date}
    },
    {
        timestamps: true
    }
)

const Student = mongoose.model("Student", schema)
export default Student