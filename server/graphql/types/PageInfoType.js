import { GraphQLObjectType, GraphQLInt, GraphQLBoolean } from 'graphql'

const PageInfoType = new GraphQLObjectType({
  name: 'PageInfo',
  fields: {
    hasNextPage: {
      type: GraphQLBoolean,
    },
    lastPage: {
      type: GraphQLInt,
    },
    count: {
      type: GraphQLInt,
    },
  },
})

export default PageInfoType
