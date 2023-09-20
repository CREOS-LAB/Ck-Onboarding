import mongoose from "mongoose";

const creatorSchema = new mongoose.Schema({
    name: String,
  }, { discriminatorKey: 'creatorType' });
  
  const Creator = mongoose.model('Creator', creatorSchema);

  export default Creator