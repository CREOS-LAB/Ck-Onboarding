import mongoose, {Schema} from "mongoose"
import Gender from "../enum/gender"

const schema = new Schema({
    schoolName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    productKey: {type: Schema.Types.ObjectId, ref: "ProductKey"},
    password: {type: String, require: true},
    },
    {
        timestamps: true
    }
)

const School = mongoose.model("School", schema)
export default School