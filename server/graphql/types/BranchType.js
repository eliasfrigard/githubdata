import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'

// Issue Type.
const BranchType = new GraphQLObjectType({
  name: 'Branch',
  fields: {
    name: {
      type: GraphQLString,
    },
    protected: {
      type: GraphQLBoolean,
    },
  },
})

export default BranchType
