import mongoose, {Schema} from "mongoose"
import Gender from "../enum/gender"


const schema = new Schema({
        fullName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        productKey: {type:String, required: true},
        age: {type: String, required: false}
    },
    {
        timestamps: true
    }
)

const UploadedStudent = mongoose.model("UploadedStudent", schema)
export default UploadedStudent