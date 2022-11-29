import mongoose from "mongoose"

const Schema = mongoose.Schema

const potluckSchema = new Schema({
  name: String,
  location: String,
  description: String,
  host: { type: Schema.Types.ObjectId, ref: 'Profile' }
}, {
  timestamps: true
})

const Potluck = mongoose.model('Potluck', potluckSchema)

export { Potluck }