import { readFile } from '../utils/io-utils.js'
import getPaginatedData from '../utils/dataFetch.js'

// Q7: For each closed bug: body of comments.
export default async () => {
  // Array of measurement results.
  const measurements = []

  // Import list of bugs from previous query.
  const bugs = readFile('./data/Q6.json')

  for (let index = 0; index < bugs.length; index++) {
    const bug = bugs[index]

    // Q7: For each closed bug: body of comments.
    const url = `${process.env.ADDRESS}/repos/${bug.organization}/${bug.repo}/issues/${bug.number}}/comments`

    // Get Data from REST API.
    const { results } = await getPaginatedData(url)

    // Add measurements to array.
    measurements.push(...results)
  }

  // Return array of results.
  return measurements
}
