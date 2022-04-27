const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
  },
  issue: {
    id: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
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
  created_at: Date,
})

const Comment = mongoose.model('Comment', schema)

module.exports = {
  Comment,
}
