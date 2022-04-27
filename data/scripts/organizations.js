const { writeFile } = require('../utils/io-utils.js')
const axios = require('axios').default

async function main() {
  let organizations = []

  for (let i = 0; i < 1500; i++) {
    const defaultSince = 234138

    let since = organizations.length > 0 ? organizations[organizations.length - 1].id : defaultSince
    let query = `https://api.github.com/organizations?per_page=100&since=${since}`

    const res = await axios.get(query, {
      auth: {
        username: 'eliasfrigard',
        password: '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',
      },
    })

    organizations = [...organizations, ...res.data]

    console.log(`${i + 1} iterations complete. ${organizations.length} organizations gathered.`)
  }

  await writeFile('../json/organizations.json', organizations)
  console.log(organizations.length)
}

main()
