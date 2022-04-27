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
  name: {
    type: String,
    required: true,
  },
  commit: {
    sha: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  protected: {
    type: Boolean,
    required: true,
  },
})

export default mongoose.model('Branch', schema)
