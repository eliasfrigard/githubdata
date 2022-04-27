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
  contributors: {
    type: Array,
    required: true,
  },
})

const Contribution = mongoose.model('Contribution', schema)

module.exports = {
  Contribution,
}
