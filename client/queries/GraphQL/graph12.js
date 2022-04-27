import axios from 'axios'

//* The following repos were randomly selected from the repository collection
//* by using the google random number generator.
const repos = [
  'engineyard/engineyard-serverside/',
  'collectiveidea/audited',
  'cultureamp/react-elm-components',
  'nodebox/nodebox',
  'liip/sf2debpkg',
  'braintree/card-validator',
  'siwapp/siwapp-ror',
  'filamentgroup/cookie',
]

// Q12: For eight projects: number of releases, stars, and language.
const query = (org, repo) => `
query {
  repository(org: "${org}", repo: "${repo}") {
    repo {
      stargazers_count
    }
    languages {
      name
    }
    releases {
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

    // Extract and return measurement.
    measurements.push(JSON.parse(res.headers.measurement))
  }

  // Return array of results.
  return measurements
}
