const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  pull_urL: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  author: {
    id: Number,
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
  labels: {
    type: Array, // Of objects.
    required: true,
  },
  repo: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  comments_url: {
    type: String,
    required: true,
  },
  comment_count: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  },
  closed_at: {
    type: Date,
    required: true,
  },
})

const Issue = mongoose.model('Issue', schema)

module.exports = {
  Issue,
}
