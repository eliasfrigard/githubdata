import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import mongoQueries from '../../mongodb/queries.js'

// Import GraphQL Types.
import IssueType from '../types/IssueType.js'
import PageInfoType from '../types/PageInfoType.js'

// New type that combines Repo and PageInfo.
const IssueInfoCombined = new GraphQLObjectType({
  name: 'IssueInfoCombined',
  fields: {
    nodes: {
      type: new GraphQLList(IssueType),
    },
    pageInfo: {
      type: PageInfoType,
    },
  },
})

const SearchIssues = {
  type: IssueInfoCombined,
  args: {
    org: { type: GraphQLString },
    repo: { type: GraphQLString },
    type: { type: GraphQLString },
    state: { type: GraphQLString },
    label: { type: GraphQLString },
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    sort: { type: GraphQLString },
    direction: { type: GraphQLString },
    number: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    // Parameters.
    const page = args.page || 1
    const limit = args.limit || 100

    // Use common method to interact with database.
    const { data, count } = await mongoQueries.getIssues({
      page: parseInt(page),
      limit: parseInt(limit),
      sort: args.sort || 'created_at',
      direction: args.direction || 'desc',
      organization: args.org,
      repo: args.repo,
      ...(args.type && { type: args.type }),
      ...(args.label && { label: args.label }),
      ...(args.state && args.state != 'all' && { state: args.state }),
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

export default SearchIssues
