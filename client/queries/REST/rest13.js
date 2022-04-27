import getPaginatedData from '../utils/dataFetch.js'

//* The following repos were randomly selected from the repository collection
//* by using the google random number generator.
const repos = [
  'engineyard/engineyard-serverside',
  'collectiveidea/audited',
  'cultureamp/react-elm-components',
  'nodebox/nodebox',
  'liip/sf2debpkg',
  'braintree/card-validator',
  'siwapp/siwapp-ror',
  'filamentgroup/cookie',
]

export default async () => {
  // Array of measurement results.
  const measurements = []

  for (let index = 0; index < repos.length; index++) {
    // Q13: Title, body, date and project name of open issues tagged with a bug tag.
    const url = `${process.env.ADDRESS}/repos/${repos[index]}/issues?label=bug&state=open`

    // Get Data from REST API.
    const { results } = await getPaginatedData(url)

    // Add measurements to array.
    measurements.push(...results)
  }

  // Return array of results.
  return measurements
}
