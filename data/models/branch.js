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

const Branch = mongoose.model('Branch', schema)

module.exports = {
  Branch,
}
