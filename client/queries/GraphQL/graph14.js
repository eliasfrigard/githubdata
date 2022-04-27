import { interceptRequest, interceptResponse } from '../utils/interceptors.js'
import { readFile } from '../utils/io-utils.js'
import axios from 'axios'

// Q14: For each issue: body of comments.
const query = (org, repo, number, page) => `
{
  issue (org:"${org}", repo:"${repo}", number:${number}) {
    comments ${page ? `(page: ${page})` : ''} {
      nodes {
        body
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
`

// Paginate to get all comments for pull request.
const paginate = async (org, repo, issueNumber) => {
  let results = []
  let next = true
  let page = 1

  while (next) {
    // Get Data from GraphQL API.
    const res = await axios.post(`${process.env.ADDRESS}/graphql`, {
      query: query(org, repo, issueNumber, page),
    })

    // Push data to return-array.
    results.push(JSON.parse(res.headers.measurement))

    // Set next and increment page.
    next = res.data.data.issue.comments.pageInfo.hasNextPage
    page = page + 1
  }

  return {
    results: results,
  }
}

export default async () => {
  // Array of measurement results.
  const measurements = []

  // Import list of issues.
  const issues = readFile('./data/Q13.json')

  // Loop through the list of pull requests to find comments.
  for (let index = 0; index < issues.length; index++) {
    const issue = issues[index]

    // Get comments.
    const { results } = await paginate(issue.org, issue.repo, issue.number)

    // Add measurements to array.
    measurements.push(...results)
  }

  // Return array of measurements.
  return measurements
}
