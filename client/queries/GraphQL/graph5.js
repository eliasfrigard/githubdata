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

// Q5: For seven projects: number of commits, branches, bugs, releases and contributors.
const query = (org, repo) => `
query {
  repository(org: "${org}", repo: "${repo}") {
    commits {
      pageInfo {
        count
      }
    }
    branches {
      pageInfo {
        count
      }
    }
    issues(type:"issue", label: "bug") {
      pageInfo {
        count
      }
    }
    releases {
      pageInfo {
        count
      }
    }
    contributors {
      pageInfo {
        count
      }
    }
  }
}
`

export default async () => {
  // Array of measurement results.
  const measurements = []

  for (let index = 0; index < repos.length; index++) {
    // Extract org and repo from full name.
    const org = repos[index].split('/')[0]
    const repo = repos[index].split('/')[1]

    // Get Data from GraphQL API.
    const res = await axios.post(`${process.env.ADDRESS}/graphql`, {
      query: query(org, repo),
    })

    // Push each repo measurement to array.
    measurements.push(JSON.parse(res.headers.measurement))
  }

  // Return array of measurements.
  return measurements
}
