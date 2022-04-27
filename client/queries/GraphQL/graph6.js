import axios from 'axios'

//* The following repos were randomly selected from the repository collection
//* by using the google random number generator.
const repos = [
  'revsys/django-test-plus',
  'box/box-java-sdk',
  'doctrine/collections',
  'libpinyin/libpinyin',
  'mysterioustrousers/MTControl',
  'gentoo/pax-utils',
  'CleverCloud/cliparse-node',
]

// Q6: For each project: title, body of closed bugs.
const query = (org, repo, page) => `
query {
  repository(org: "${org}", repo: "${repo}") {
    issues(label:"bug", state:"closed" ${page ? `, page: ${page}` : ''}) {
      nodes {
        title
        body
        number
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
`

// Paginate to get all pull requests for a repo.
const paginate = async (org, repo) => {
  let results = []
  let next = true
  let page = 1

  while (next) {
    // Get Data from GraphQL API.
    const res = await axios.post(`${process.env.ADDRESS}/graphql`, {
      query: query(org, repo, page),
    })

    // Push data to return-array.
    results.push(JSON.parse(res.headers.measurement))

    // Set next and increment page.
    next = res.data.data.repository.issues.pageInfo.hasNextPage
    page = page + 1
  }

  return {
    results: results,
  }
}

export default async () => {
  // Array of measurement results.
  const measurements = []

  // Loop through the list of repos to find pull requests.
  for (let index = 0; index < repos.length; index++) {
    // Extract org and repo from full name.
    const org = repos[index].split('/')[0]
    const repo = repos[index].split('/')[1]

    // Get pull requests.
    const { results } = await paginate(org, repo)

    // Add measurements to array.
    measurements.push(...results)
  }

  // Return array of measurements.
  return measurements
}
