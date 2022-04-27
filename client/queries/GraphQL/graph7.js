import { readFile } from '../utils/io-utils.js'
import axios from 'axios'

// Q7: For each closed bug: body of comments.
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

// Paginate to get all pull requests for a repo.
const paginate = async (org, repo, bugNumber) => {
  let results = []
  let next = true
  let page = 1

  while (next) {
    // Get Data from GraphQL API.
    const res = await axios.post(`${process.env.ADDRESS}/graphql`, {
      query: query(org, repo, bugNumber, page),
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

  // Import list of bugs from previous query.
  const bugs = readFile('./data/Q6.json')

  // Loop through the list of bugs to find comments.
  for (let index = 0; index < bugs.length; index++) {
    const bug = bugs[index]

    // Get pull requests.
    const { results } = await paginate(bug.organization, bug.repo, bug.number)

    // Add measurements to array.
    measurements.push(...results)
  }

  // Return array of results.
  return measurements
}
