import { readFile } from '../utils/io-utils.js'
import getPaginatedData from '../utils/dataFetch.js'

export default async () => {
  // Array of measurement results.
  const measurements = []

  // Import list of issues from previous query.
  const issues = readFile('./data/Q13.json')

  for (let index = 0; index < issues.length; index++) {
    const issue = issues[index]

    // Q14: For each issue: body of comments.
    const url = `${process.env.ADDRESS}/repos/${issue.organization}/${issue.repo}/issues/${issue.number}/comments`

    // Get Data from REST API.
    const { results } = await getPaginatedData(url)

    // Add measurements to array.
    measurements.push(...results)
  }

  // Return array of results.
  return measurements
}
