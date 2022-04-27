import { GraphQLObjectType, GraphQLString } from 'graphql'

// Comment Type.
const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    body: {
      type: GraphQLString,
    },
  },
})

export default CommentType
