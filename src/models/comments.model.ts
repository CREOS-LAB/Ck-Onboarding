import mongoose, {Schema} from "mongoose"

const schema = new Schema({
    video: {type: Schema.Types.ObjectId, ref: "Videos"},
    studentId: {type: Schema.Types.ObjectId, ref: 'Student'},
    content: {type: String}
},
{
    timestamps: true
})

const Comments = mongoose.model("Comments", schema)
export default Comments