import { readFile } from '../utils/io-utils.js'
import axios from 'axios'

// Q2: For each project: total number and body of the 1K most recent PRs.
const query = (org, repo, page) => `
query {
  repository(org: "${org}", repo: "${repo}") {
    issues(type: "pull", state: "all" ${page ? `, page: ${page}` : ''}) {
      nodes {
        body
        number
      }
      pageInfo {
        count
        hasNextPage
      }
    }
  }
}
`

// Paginate to get all pull requests for a repo.
const paginate = async (org, repo) => {
  let results = []
  let next = true
  let page = 1

  while (next) {
    // Get Data from GraphQL API.
    const res = await axios.post(`${process.env.ADDRESS}/graphql`, {
      query: query(org, repo, page),
    })

    // Push data to return-array.
    results.push(JSON.parse(res.headers.measurement))

    // Set next and increment page.
    next = res.data.data.repository.issues.pageInfo.hasNextPage
    page = page + 1
  }

  return {
    results: results,
  }
}

// Q2: For each project: total number and body of the 1K most recent PRs.
export default async () => {
  // Array of measurement results.
  const measurements = []

  // Import list of repositories from previous query.
  const repos = readFile('./data/Q1.json')

  // Loop through the list of repos to find pull requests.
  for (let index = 0; index < repos.length; index++) {
    // Extract org and repo from full name.
    const org = repos[index].full_name.split('/')[0]
    const repo = repos[index].full_name.split('/')[1]

    // Get pull requests.
    const { results } = await paginate(org, repo)

    // Add measurements to array.
    measurements.push(...results)
  }

  // Return array of results.
  return measurements
}
