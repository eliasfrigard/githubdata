import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  repo: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  node_id: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: true,
  },
  gravatar_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  html_url: {
    type: String,
    required: true,
  },
  followers_url: {
    type: String,
    required: true,
  },
  following_url: {
    type: String,
    required: true,
  },
  gists_url: {
    type: String,
    required: true,
  },
  starred_url: {
    type: String,
    required: true,
  },
  subscriptions_url: {
    type: String,
    required: true,
  },
  organizations_url: {
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
  received_events_url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  site_admin: {
    type: Boolean,
    required: true,
  },
  contributions: {
    type: Number,
    required: true,
  },
})

export default mongoose.model('User', schema)
