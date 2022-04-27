import getPaginatedData from '../utils/dataFetch.js'

export default async () => {
  // Q8: Name and URL of Java projects created before Jan, 2012, with 10+ stars, and 1+ commits
  const url = `${process.env.ADDRESS}/search/repositories?before=2012-01-01&stars=100&size=1000&language=Java`

  // Get Data from REST API.
  const { results } = await getPaginatedData(url)

  // Return array of measurements.
  return results
}
