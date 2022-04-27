const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  node_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  repos_url: {
    type: String,
    required: true,
  },
  events_url: {
    type: String,
    required: true,
  },
  hooks_url: {
    type: String,
    required: true,
  },
  issues_url: {
    type: String,
    required: true,
  },
  members_url: {
    type: String,
    required: true,
  },
  public_members_url: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const Organization = mongoose.model('Organization', schema)

module.exports = {
  Organization,
}
