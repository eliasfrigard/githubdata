import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Issue Type.
const CommitType = new GraphQLObjectType({
  name: 'Commit',
  fields: {
    message: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLInt,
    },
  },
})

export default CommitType
