import axios from 'axios'

//* The following repos were randomly selected from the repository collection.
const repos = [
  'KDAB/KDStateMachineEditor',
  'citerus/bookstore-cqrs-example',
  'cookpad/global-style-guides',
  'collectiveidea/audited',
  'OpenELEC/wlan-firmware',
  'liferay/liferay-js-toolkit',
  'scala/scala-collection-compat',
  'harvesthq/platform',
  'opencredo/test-automation-quickstart',
  'monome/teletype',
  'processone/tsung',
  'mutualmobile/lavaca',
  'woocommerce/woocommerce-rest-api-docs',
  'npr/responsiveiframe',
  'lucidnz/bootstrapify-1',
  'github/scientist',
  'trailbehind/DeepOSM',
  'NixOS/npm2nix',
  'arquillian/arquillian-core',
  'jruby/jruby',
]
// Q5: For seven projects: number of commits, branches, bugs, releases and contributors.
const query = (org, repo) => `
query {
  repository(org: "${org}", repo: "${repo}") {
      repo {
        stargazers_count
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

    // Extract measurement.
    measurements.push(JSON.parse(res.headers.measurement))
  }

  // Return array of measurements.
  return measurements
}
