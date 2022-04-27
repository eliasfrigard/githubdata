import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  repo: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  contributors: {
    type: Array,
    required: true,
  },
})

export default mongoose.model('Contribution', schema)
