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
export default async () => {
  // Array of measurement results.
  const measurements = []

  for (let index = 0; index < repos.length; index++) {
    const repo = `${process.env.ADDRESS}/repos/${repos[index]}`

    // Get Data from REST API.
    // Pagination / count variables are available in headers, only one request needed per entity.
    const commits = await axios.get(`${repo}/commits`)
    const branches = await axios.get(`${repo}/branches`)
    const bugs = await axios.get(`${repo}/issues?label=bug`)
    const releases = await axios.get(`${repo}/releases`)
    const contributors = await axios.get(`${repo}/contributors`)

    measurements.push([
      JSON.parse(commits.headers.measurement),
      JSON.parse(branches.headers.measurement),
      JSON.parse(bugs.headers.measurement),
      JSON.parse(releases.headers.measurement),
      JSON.parse(contributors.headers.measurement),
    ])
  }

  // Return array of measurements.
  return measurements
}
