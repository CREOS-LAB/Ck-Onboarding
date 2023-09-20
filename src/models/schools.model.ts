import mongoose, {Schema} from "mongoose"
import Gender from "../enum/gender"
import Creator from "./creators.model"

const schema = new Schema({
        schoolName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        productKey: {type: String},
        password: {type: String, required: true},
    },
    {
        timestamps: true
    }
)

const School = mongoose.model("School", schema)
export default School