import { readFile } from '../utils/io-utils.js'
import getPaginatedData from '../utils/dataFetch.js'

export default async () => {
  // Array of measurement results.
  const measurements = []

  // Import list of pull requests from previous query.
  const pulls = readFile('./data/Q2.json')

  for (let index = 0; index < pulls.length; index++) {
    const pull = pulls[index]

    // Q3: For each PR: body of comments.
    const url = `${process.env.ADDRESS}/repos/${pull.organization}/${pull.repo}/issues/${pull.number}/comments`

    // Get Data from REST API.
    const { results } = await getPaginatedData(url)

    // Add measurements to array.
    measurements.push(...results)
  }

  // Return array of results.
  return measurements
}
