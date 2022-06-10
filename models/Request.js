import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  uid: {type: String, index: true},
  requestDate: Date,
  dueDate: Date,
  status: {
    type: String,
    enum : ['waiting','washing','done'],
    default: 'waiting' 
  } ,
  contact: String,
  note: String
})

export default mongoose.models.Request || mongoose.model('Request', RequestSchema)