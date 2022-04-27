import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql'
import mongoQueries from '../../mongodb/queries.js'

// Import GraphQL Types.
import IssueComments from './IssueComments.js'
import IssueType from '../types/IssueType.js'

// New type that combines Repo and PageInfo.
const IssueData = new GraphQLObjectType({
  name: 'IssueData',
  fields: {
    issue: {
      type: IssueType,
    },
    comments: IssueComments,
  },
})

const IssueResolver = {
  type: IssueData,
  args: {
    org: { type: GraphQLString },
    repo: { type: GraphQLString },
    number: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    // Find issue matching the criteria.
    const issue = await mongoQueries.getIssue({
      repo: args.repo,
      organization: args.org,
      number: args.number,
    })

    return {
      issue: issue,
      comments: [],
      repo: args.repo,
      organization: args.org,
      number: args.number,
    }
  },
}

export default IssueResolver
