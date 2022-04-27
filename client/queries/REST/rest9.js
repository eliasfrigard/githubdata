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

export default async () => {
  // Array of measurement results.
  const measurements = []

  for (let index = 0; index < repos.length; index++) {
    // Q9: Number of stars of specific projects.
    const url = `${process.env.ADDRESS}/repos/${repos[index]}`

    // Get Data from REST API.
    const res = await axios.get(url)

    // Extract measurement.
    measurements.push(JSON.parse(res.headers.measurement))
  }

  // Return array of measurements.
  return measurements
}
