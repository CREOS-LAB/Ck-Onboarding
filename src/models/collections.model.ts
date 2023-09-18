import mongoose, {Schema} from "mongoose"

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    cover: {type: String, required: true},
    class: {type: Schema.Types.ObjectId, required: false},
    category: {type: String, required: false},
    maxAge: {type: Number, required: true},
    minAge: {type: Number, required: true}
},
{
    timestamps: true
})

const Collections = mongoose.model("Collections", schema)
export default Collections

