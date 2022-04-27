import { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import mongoQueries from '../../mongodb/queries.js'

// Import GraphQL Types.
import PageInfoType from '../types/PageInfoType.js'
import BranchType from '../types/BranchType.js'

// New type that combines Branch & PageInfo.
const BranchInfo = new GraphQLObjectType({
  name: 'BranchInfo',
  fields: {
    nodes: {
      type: new GraphQLList(BranchType),
    },
    pageInfo: {
      type: PageInfoType,
    },
  },
})

const RepoBranches = {
  type: BranchInfo,
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
    const { data, count } = await mongoQueries.getBranches({
      page: parseInt(page),
      limit: parseInt(limit),
      sort: args.sort || 'name',
      direction: args.direction || 'asc',
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

export default RepoBranches
