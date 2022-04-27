import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema, GraphQLObjectType } from 'graphql'

// Import GraphQL Resolved Types.
import SearchRepos from '../graphql/resolvers/SearchRepos.js'
import SearchReposAll from '../graphql/resolvers/SearchReposAll.js'
import SearchIssues from '../graphql/resolvers/SearchIssues.js'
import Repository from '../graphql/resolvers/Repository.js'
import Issue from '../graphql/resolvers/Issue.js'

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    searchRepos: SearchRepos,
    searchReposAll: SearchReposAll,
    searchIssues: SearchIssues,
    repository: Repository,
    issue: Issue,
  },
})

const schema = new GraphQLSchema({
  query: RootQuery,
})

export const router = express.Router()

router.use(
  '/',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)
