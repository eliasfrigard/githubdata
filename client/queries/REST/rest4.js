import axios from 'axios'

export default async () => {
  // Q4: Name and URL of the top-5 projects by stars (in any programming language).
  const repoUrl = `${process.env.ADDRESS}/search/repositories?sort=stargazers_count&direction=desc&limit=5`

  // Get Data from REST API.
  const res = await axios.get(repoUrl)

  // Extract and return measurement.
  return [JSON.parse(res.headers.measurement)]
}
