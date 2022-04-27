import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql'

// Issue Type.
const ReleaseType = new GraphQLObjectType({
  name: 'Release',
  fields: {
    id: {
      type: GraphQLInt,
    },
    node_id: {
      type: GraphQLString,
    },
    tag_name: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
    draft: {
      type: GraphQLBoolean,
    },
    prerelease: {
      type: GraphQLBoolean,
    },
    created_at: {
      type: GraphQLString,
    },
    published_at: {
      type: GraphQLString,
    },
  },
})

export default ReleaseType
