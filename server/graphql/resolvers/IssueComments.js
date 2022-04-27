import { GraphQLObjectType, GraphQLInt, GraphQLList } from 'graphql'
import mongoQueries from '../../mongodb/queries.js'

// Import GraphQL Types.
import PageInfoType from '../types/PageInfoType.js'
import CommentType from '../types/CommentType.js'

// New type that combines Branch & PageInfo.
const CommentInfo = new GraphQLObjectType({
  name: 'CommentInfo',
  fields: {
    nodes: {
      type: new GraphQLList(CommentType),
    },
    pageInfo: {
      type: PageInfoType,
    },
  },
})

const IssueComments = {
  type: CommentInfo,
  args: {
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    const page = args.page || 1
    const limit = args.limit || 100

    // Use common method to interact with database.
    const { data, count } = await mongoQueries.getComments({
      page: parseInt(page),
      limit: parseInt(limit),
      organization: parent.organization,
      repo: parent.repo,
      ...(parent.number && { number: parent.number }),
    })

    return {
      nodes: data,
      pageInfo: {
        hasNextPage: page < Math.ceil(count / limit),
        lastPage: Math.ceil(count / limit),
        count: count,
      },
    }
  },
}

export default IssueComments
