import mongoose, {Schema} from "mongoose"

const schema = new Schema({
    name: {type: String},
    school: {type: Schema.Types.ObjectId, ref: "School"}
},
{
    timestamps: true
})

const Classes = mongoose.model("Classes", schema)
export default Classes