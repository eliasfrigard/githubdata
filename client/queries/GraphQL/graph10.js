import axios from 'axios'

// Q10: Name of repositories with at least 1K stars.
const query = (page) => `
query {
  searchRepos (stars: 1000, page: ${page}) {
    nodes {
      full_name
    }
    pageInfo {
      hasNextPage
    }
  }
}
`

// Paginate to get all pull requests for a repo.
const paginate = async () => {
  let results = []
  let next = true
  let page = 1

  while (next) {
    // Get Data from GraphQL API.
    const res = await axios.post(`${process.env.ADDRESS}/graphql`, {
      query: query(page),
    })

    // Push data to return-array.
    results.push(JSON.parse(res.headers.measurement))

    // Set next and increment page.
    next = res.data.data.searchRepos.pageInfo.hasNextPage
    page = page + 1
  }

  return {
    results: results,
  }
}

export default async () => {
  const { results } = await paginate()

  // Return array of results.
  return results
}
