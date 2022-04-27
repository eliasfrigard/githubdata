const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  repo: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
})

const Commit = mongoose.model('Commit', schema)

module.exports = {
  Commit,
}
