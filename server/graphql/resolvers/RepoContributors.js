import { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import mongoQueries from '../../mongodb/queries.js'

// Import GraphQL Types.
import PageInfoType from '../types/PageInfoType.js'
import UserType from '../types/UserType.js'

// New type that combines Branch & PageInfo.
const ContributionInfo = new GraphQLObjectType({
  name: 'ContributionInfo',
  fields: {
    nodes: {
      type: new GraphQLList(UserType),
    },
    pageInfo: {
      type: PageInfoType,
    },
  },
})

const RepoContributors = {
  type: ContributionInfo,
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
    const { data, count } = await mongoQueries.getContributors({
      page: parseInt(page),
      limit: parseInt(limit),
      sort: args.sort || 'login',
      direction: args.direction || 'asc',
      organization: parent.organization,
      repo: parent.repository,
    })

    return {
      nodes: data,
      pageInfo: {
        hasNextPage: page <= Math.ceil(count / limit),
        lastPage: Math.ceil(count / limit),
        count: count,
      },
    }
  },
}

export default RepoContributors
