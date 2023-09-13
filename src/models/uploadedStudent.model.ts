import mongoose, {Schema} from "mongoose"
import Gender from "../enum/gender"


const schema = new Schema({
        fullName: {type: String, required: true},
        gender: {type: String, required: false },
        email: {type: String, required: true, unique: true},
        productKey: {type:String, required: true},
    },
    {
        timestamps: true
    }
)

const UploadedStudent = mongoose.model("UploadedStudent", schema)
export default UploadedStudent