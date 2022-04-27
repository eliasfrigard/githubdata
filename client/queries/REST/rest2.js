import { readFile } from '../utils/io-utils.js'
import getPaginatedData from '../utils/dataFetch.js'

// Q2: For each project: total number and body of the 1K most recent PRs.
export default async () => {
  // Array of measurement results.
  const measurements = []

  // Import list of repositories from previous query.
  const repos = readFile('./data/Q1.json')

  for (let index = 0; index < repos.length; index++) {
    const url = `${process.env.ADDRESS}/repos/${repos[index].full_name}/pulls?state=all`

    // Get Data from REST API.
    const { results } = await getPaginatedData(url)

    // Add measurements to array.
    measurements.push(...results)
  }

  // Return array of results.
  return measurements
}
