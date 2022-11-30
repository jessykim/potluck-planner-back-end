import mongoose from 'mongoose'

const Schema = mongoose.Schema

const foodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Main', 'Side', 'Dessert', 'Other'],
    required: true
  },
  notes: String,
  provider: { type: Schema.Types.ObjectId, ref: 'Profile'}
},{
  timestamps: true,
})

const Food = mongoose.model('Food', foodSchema)

export { Food }