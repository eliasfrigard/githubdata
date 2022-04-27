import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

// Issue Type.
const LanguageType = new GraphQLObjectType({
  name: 'Language',
  fields: {
    name: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLInt,
    },
  },
})

export default LanguageType
