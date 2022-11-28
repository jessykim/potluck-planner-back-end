import mongoose, { trusted } from "mongoose"

const Schema = mongoose.Schema

const potluckSchema = new Schema({
  name: String,
  location: String,
  description: String
}, {
  timestamps: true
})

const Potluck = mongoose.model('Potluck', potluckSchema)

export { Potluck }