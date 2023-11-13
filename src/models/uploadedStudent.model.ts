import mongoose, {Schema} from "mongoose"


const schema = new Schema({
        fullName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        productKey: {type:String, required: true},
        age: {type: String, required: false},
        dob: {type: Date}
    },
    {
        timestamps: true
    }
)

const UploadedStudent = mongoose.model("UploadedStudent", schema)
export default UploadedStudent