import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Issue Type.
const IssueType = new GraphQLObjectType({
  name: 'Issue',
  fields: {
    id: {
      type: GraphQLInt,
    },
    number: {
      type: GraphQLInt,
    },
    title: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLString,
    },
  },
})

export default IssueType
