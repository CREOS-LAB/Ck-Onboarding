import mongoose, {Schema} from "mongoose"

const schema = new Schema({
    key: {type: String, require: true},
},
{
    timestamps: true
})

const ProductKey = mongoose.model("ProductKey", schema)
export default ProductKey