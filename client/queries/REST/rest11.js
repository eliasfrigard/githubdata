import { readFile } from '../utils/io-utils.js'
import axios from 'axios'

export default async () => {
  // Array of measurement results.
  const measurements = []

  // Import list of repositories from previous query.
  const repos = readFile('./data/Q10.json')

  for (let index = 0; index < repos.length; index++) {
    // Q11: Number of commits in a repository.
    const url = `${process.env.ADDRESS}/repos/${repos[index].full_name}/commits`

    // Get Data from REST API.
    const res = await axios.get(url)

    // Extract and return measurement.
    measurements.push(JSON.parse(res.headers.measurement))
  }

  // Return array of results.
  return measurements
}
