import mongoose from 'mongoose'

const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Bowls/Plates', 'Cups', 'Decorations', 'Utensils', 'Other'],
    required: true
  },
  notes: String,
  provider: { type: Schema.Types.ObjectId, ref: 'Profile'}
},{
  timestamps: true,
})

const Item = mongoose.model('Item', itemSchema)

export { Item }