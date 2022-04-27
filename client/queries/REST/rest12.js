import axios from 'axios'

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

  // Q12: For eight projects: number of releases, stars, and language.
  for (let index = 0; index < repos.length; index++) {
    const url = `${process.env.ADDRESS}/repos/${repos[index]}`

    // Get stars, languages and releases (repo data includes stars).
    const repo = await axios.get(url)
    const languages = await axios.get(`${url}/languages`)
    const releases = await axios.get(`${url}/releases`)

    measurements.push([
      JSON.parse(repo.headers.measurement),
      JSON.parse(languages.headers.measurement),
      JSON.parse(releases.headers.measurement),
    ])
  }

  // Return array of measurements.
  return measurements
}
