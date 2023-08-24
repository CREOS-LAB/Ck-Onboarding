import mongoose, {Schema} from "mongoose"

const schema = new Schema({
    key: {type: String, require: true},
    school: {type: Schema.Types.ObjectId, ref: "School"},
},
{
    timestamps: true
})

const ProductKey = mongoose.model("ProductKey", schema)
export default ProductKey