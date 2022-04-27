import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } from 'graphql'

// Repository Type.
const RepoPermissions = new GraphQLObjectType({
  name: 'RepoPermissions',
  fields: {
    admin: {
      type: GraphQLBoolean,
    },
    maintain: {
      type: GraphQLBoolean,
    },
    push: {
      type: GraphQLBoolean,
    },
    triage: {
      type: GraphQLBoolean,
    },
    pull: {
      type: GraphQLBoolean,
    },
  },
})

export default RepoPermissions
