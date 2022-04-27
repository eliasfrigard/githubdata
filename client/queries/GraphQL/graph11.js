import { readFile } from '../utils/io-utils.js'
import axios from 'axios'

// Q11: Number of commits in a repository.
const query = (org, repo) => `
query {
  repository (org:"${org}", repo:"${repo}") {
    commits {
      pageInfo {
        count
      }
    }
  }
}
`

export default async () => {
  // Array of measurement results.
  const measurements = []

  // Import list of repositories from previous query.
  const repos = readFile('./data/Q10.json')

  // Loop through the list of repos to find commits.
  for (let index = 0; index < repos.length; index++) {
    // Extract org and repo from full name.
    const org = repos[index].full_name.split('/')[0]
    const repo = repos[index].full_name.split('/')[1]

    // Get Data from GraphQL API.
    const res = await axios.post(`${process.env.ADDRESS}/graphql`, {
      query: query(org, repo),
    })

    // Extract measurement.
    measurements.push(JSON.parse(res.headers.measurement))
  }

  // Return array of measurements.
  return measurements
}
