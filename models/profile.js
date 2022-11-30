import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  allergies: String,
  dietpref: {
    type: String,
    enum: ['None', 'Dairy-Free', 'Gluten-Free', 'Lactose-Free', 'Nut-Free', 'Soy-Free', 'Vegan', 'Vegetarian', 'Other']
  },
  potlucks: [{ type: Schema.Types.ObjectId, ref: 'Potluck'}]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
