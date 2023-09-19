import mongoose, {Schema, Types} from "mongoose"

const schema = new Schema({
    name: {type: String, required: false},
    description: {type: String, required: false},
    link: {type: String, required: true},
    collectionRelation: {type: Schema.Types.ObjectId, ref: "Collections", required: false},
    views:  [{type: Schema.Types.ObjectId, ref: "Student"}],
    watched: [{type: Schema.Types.ObjectId, ref: "Student"}],
    cover: {type: String, required: false, default: "https://education-ga.ketcloud.ket.org/wp-content/uploads/letslearn.jpg"},
    maxAge: {type: Number, required: false},
    minAge: {type: Number, required: false},
    category: {type: String, required: false},
},
{
    timestamps: true
})

const Videos = mongoose.model("Videos", schema)
export default Videos