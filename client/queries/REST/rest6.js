import getPaginatedData from '../utils/dataFetch.js'

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
export default async () => {
  // Array of measurement results.
  const measurements = []

  for (let index = 0; index < repos.length; index++) {
    // Q6: For each project: title, body of closed bugs.
    const url = `${process.env.ADDRESS}/repos/${repos[index]}/issues?label=bug&state=closed`

    // Get Data from REST API.
    const { results } = await getPaginatedData(url)

    // Add measurements to array.
    measurements.push(...results)
  }

  // Return array of results.
  return measurements
}
