import axios from 'axios'
import ProgressBar from './progress-ui.js'

const warmupIterations = 2000

export const warmupRest = async () => {
  console.log('')
  console.log('Running REST warmup...')
  console.log('')

  // Initialize progress bar.
  const bar = new ProgressBar(warmupIterations)
  bar.start()

  // Q1: Get name of the top-100 C projects by stars.
  const repoUrl = `${process.env.ADDRESS}/search/repositories?language=C&sort=stargazers_count&direction=desc`

  for (let index = 0; index < warmupIterations; index++) {
    // Get Data from REST API.
    await axios.get(repoUrl)

    bar.update(index + 1)
  }
}

export const warmupGraphQL = async () => {
  console.log('')
  console.log('Running GraphQL warmup...')
  console.log('')

  // Initialize progress bar.
  const bar = new ProgressBar(warmupIterations)
  bar.start()

  // Q1: Get name of the top-100 C projects by stars.
  const query = () => `
  query {
    searchRepos (language:"C", sort:"stargazers_count", direction:"desc", limit:100) {
      nodes {
        full_name
      }
    }
  }
  `

  for (let index = 0; index < warmupIterations; index++) {
    // Get Data from GraphQL API.
    const res = await axios.post(`${process.env.ADDRESS}/graphql`, {
      query: query(),
    })

    bar.update(index + 1)
  }
}
