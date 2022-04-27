import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } from 'graphql'

// Repository Type.
const RepoLicence = new GraphQLObjectType({
  name: 'RepoLicence',
  fields: {
    key: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    spdx_id: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString,
    },
    node_id: {
      type: GraphQLString,
    },
  },
})

export default RepoLicence
