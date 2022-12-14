import mongoose from 'mongoose'

const Schema = mongoose.Schema

const drinkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  alcoholic: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: String
  },
  notes: String,
  provider: { type: Schema.Types.ObjectId, ref: 'Profile'}
},{
  timestamps: true,
})

const Drink = mongoose.model('Drink', drinkSchema)

export { Drink }