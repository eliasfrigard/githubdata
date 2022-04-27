import getPaginatedData from '../utils/dataFetch.js'

export default async () => {
  // Q10: Name of repositories with at least 1K stars.
  const url = `${process.env.ADDRESS}/search/repositories?stars=1000&sort=stargazers_count&direction=desc`

  // Get Data from REST API.
  const { results } = await getPaginatedData(url)

  // Return array of measurements.
  return results
}
