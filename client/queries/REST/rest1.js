import axios from 'axios'

export default async () => {
  // Q1: Get name of the top-100 C projects by stars.
  const url = `${process.env.ADDRESS}/search/repositories?language=C&sort=stargazers_count&direction=desc`

  // Get Data from REST API.
  const res = await axios.get(url)

  // Extract and return measurement.
  return [JSON.parse(res.headers.measurement)]
}
