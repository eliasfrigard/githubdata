import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  node_id: {
    type: String,
    required: true,
    unique: true,
  },
  tag_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  draft: {
    type: Boolean,
    required: true,
  },
  prerelease: {
    type: Boolean,
    required: true,
  },
  author: {
    id: {
      type: Number,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  repo: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  published_at: {
    type: Date,
    required: true,
  },
})

export default mongoose.model('Release', schema)
