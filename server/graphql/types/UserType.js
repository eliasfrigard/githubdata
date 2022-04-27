import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql'

// Issue Type.
const UserType = new GraphQLObjectType({
  name: 'Contribution',
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
    events_url: {
      type: GraphQLString,
    },
    received_events_url: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    site_admin: {
      type: GraphQLBoolean,
    },
    contributions: {
      type: GraphQLInt,
    },
  },
})

export default UserType
