import axios from 'axios'

// Q8: Name and URL of the top-5 projects by stars.
const query = (page) => `
query {
  searchRepos (language:"Java", size:1000, stars:100, before:"2012-01-01" page:${page}) {
    nodes {
      full_name
      html_url
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
