import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import mongoQueries from '../../mongodb/queries.js'

// Import GraphQL Types.
import PageInfoType from '../types/PageInfoType.js'
import ReleaseType from '../types/ReleaseType.js'

// New type that combines Branch & PageInfo.
const ReleaseInfo = new GraphQLObjectType({
  name: 'ReleaseInfo',
  fields: {
    nodes: {
      type: new GraphQLList(ReleaseType),
    },
    pageInfo: {
      type: PageInfoType,
    },
  },
})

const RepoReleases = {
  type: ReleaseInfo,
  args: {
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    sort: { type: GraphQLString },
    direction: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const page = args.page || 1
    const limit = args.limit || 100

    // Use common method to interact with database.
    const { data, count } = await mongoQueries.getReleases({
      page: parseInt(page),
      limit: parseInt(limit),
      sort: args.sort || 'created_at',
      direction: args.direction || 'desc',
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

export default RepoReleases
