import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import mongoQueries from '../../mongodb/queries.js'

// Import GraphQL Types.
import RepoType from '../types/RepoType.js'
import RepoBranches from './RepoBranches.js'
import RepoReleases from './RepoReleases.js'
import RepoIssues from './RepoIssues.js'
import RepoCommits from './RepoCommits.js'
import RepoContributors from './RepoContributors.js'
import LanguageType from '../types/LanguageType.js'

// New type that combines Repo and PageInfo.
const RepoData = new GraphQLObjectType({
  name: 'RepoData',
  fields: {
    repo: {
      type: RepoType,
    },
    branches: RepoBranches,
    issues: RepoIssues,
    releases: RepoReleases,
    contributors: RepoContributors,
    commits: RepoCommits,
    languages: {
      type: new GraphQLList(LanguageType),
      async resolve(parent, args) {
        // Get all languages for the parent repository.
        return await mongoQueries.getLanguages({
          repo: parent.repository,
          organization: parent.organization,
        })
      },
    },
  },
})

const Repo = {
  type: RepoData,
  args: {
    org: { type: GraphQLString },
    repo: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const repo = await mongoQueries.getRepo({ organization: args.org, repo: args.repo })

    return {
      repo: repo,
      branches: [],
      issues: [],
      releases: [],
      languages: [],
      commits: [],
      repository: args.repo,
      organization: args.org,
    }
  },
}

export default Repo
