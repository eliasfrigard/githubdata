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
  languages: {
    type: Array,
    required: true,
  },
})

const Language = mongoose.model('Language', schema)

module.exports = {
  Language,
}
