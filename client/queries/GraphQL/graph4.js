import axios from 'axios'

// Q1: Get name of the top-100 C projects by stars.
const query = () => `
query {
  searchRepos (sort:"stargazers_count", direction:"desc", limit:5) {
    nodes {
      full_name
      html_url
    }
  }
}
`

export default async () => {
  // Get Data from GraphQL API.
  const res = await axios.post(`${process.env.ADDRESS}/graphql`, {
    query: query(),
  })

  // Extract and return measurement.
  return [JSON.parse(res.headers.measurement)]
}
