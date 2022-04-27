import { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import mongoQueries from '../../mongodb/queries.js'

// Import GraphQL Types.
import PageInfoType from '../types/PageInfoType.js'
import CommitType from '../types/CommitType.js'

// New type that combines Branch & PageInfo.
const CommitInfo = new GraphQLObjectType({
  name: 'CommitInfo',
  fields: {
    nodes: {
      type: new GraphQLList(CommitType),
    },
    pageInfo: {
      type: PageInfoType,
    },
  },
})

const RepoCommits = {
  type: CommitInfo,
  args: {
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    const page = args.page || 1
    const limit = args.limit || 100

    // Use common method to interact with database.
    const { data, count } = await mongoQueries.getCommits({
      page: parseInt(page),
      limit: parseInt(limit),
      organization: parent.organization,
      repo: parent.repository,
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

export default RepoCommits
