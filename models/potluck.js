import mongoose from "mongoose"

const Schema = mongoose.Schema

const RSVPSchema = new Schema(
  {
    guest: {
      type: Schema.Types.ObjectId, ref: 'Profile'
    },
    party: {
      type: Number,
      required: true
    },
    notes: {
      type: String
    },
    rsvp: {
      type: String,
      required: true,
      enum: ['Yes', 'No', 'Maybe']
    }
  },
  { timestamps: true }
)

const potluckSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    host: { 
      type: Schema.Types.ObjectId, ref: 'Profile' 
    },
    rsvps: [RSVPSchema],
    food: [{ 
      type: Schema.Types.ObjectId, ref: 'Food' 
    }],
    items: [{ 
      type: Schema.Types.ObjectId, ref: 'Item' 
    }],
    drinks: [{ 
      type: Schema.Types.ObjectId, ref: 'Drink' 
    }],
  }, 
  { timestamps: true }
)

const Potluck = mongoose.model('Potluck', potluckSchema)

export { Potluck }