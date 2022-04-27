import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql'

// Repository Type.
const RepoType = new GraphQLObjectType({
  name: 'Repository',
  fields: {
    id: {
      type: GraphQLInt,
    },
    node_id: {
      type: GraphQLString,
    },
    language: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    full_name: {
      type: GraphQLString,
    },
    private: {
      type: GraphQLBoolean,
    },
    stargazers_count: {
      type: GraphQLInt,
    },
    html_url: {
      type: GraphQLString,
    },
  },
})

export default RepoType
