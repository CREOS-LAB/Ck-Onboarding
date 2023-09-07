import mongoose, {Schema} from "mongoose"

const schema = new Schema({
    name: {type: String},
},
{
    timestamps: true
})

const Classes = mongoose.model("Classes", schema)
export default Classes