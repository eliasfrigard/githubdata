import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } from 'graphql'

// Repository Type.
const RepoOwner = new GraphQLObjectType({
  name: 'RepoOwner',
  fields: {
    login: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLInt,
    },
    node_id: {
      type: GraphQLString,
    },
    avatar_url: {
      type: GraphQLString,
    },
    gravatar_id: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString,
    },
    html_url: {
      type: GraphQLString,
    },
    followers_url: {
      type: GraphQLString,
    },
    following_url: {
      type: GraphQLString,
    },
    gists_url: {
      type: GraphQLString,
    },
    starred_url: {
      type: GraphQLString,
    },
    subscriptions_url: {
      type: GraphQLString,
    },
    organizations_url: {
      type: GraphQLString,
    },
    repos_url: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    events_url: {
      type: GraphQLString,
    },
    received_events_url: {
      type: GraphQLString,
    },
    site_admin: {
      type: GraphQLBoolean,
    },
  },
})

export default RepoOwner
