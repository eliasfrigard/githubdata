import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import mongoQueries from '../../mongodb/queries.js'

// Import GraphQL Types.
import RepoTypeAll from '../types/RepoTypeAll.js'
import PageInfoType from '../types/PageInfoType.js'

// New type that combines Repo and PageInfo.
const RepoAllInfoCombined = new GraphQLObjectType({
  name: 'RepoAllInfoCombined',
  fields: {
    nodes: {
      type: new GraphQLList(RepoTypeAll),
    },
    pageInfo: {
      type: PageInfoType,
    },
  },
})

const SearchReposAll = {
  type: RepoAllInfoCombined,
  args: {
    language: { type: GraphQLString },
    stars: { type: GraphQLInt },
    size: { type: GraphQLInt },
    before: { type: GraphQLString },
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    sort: { type: GraphQLString },
    direction: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const page = args.page || 1
    const limit = args.limit || 100

    // Use common method to interact with database.
    const { data, count } = await mongoQueries.getRepos({
      page: parseInt(page),
      limit: parseInt(limit),
      sort: args.sort || 'id',
      direction: args.direction || 'asc',
      ...(args.language && { language: args.language }),
      ...(args.stars && { stars: parseInt(args.stars) }),
      ...(args.size && { size: parseInt(args.size) }),
      ...(args.before && { before: args.before }),
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

export default SearchReposAll
