const { writeFile, readFile, appendFile, sendRequest, rateLimitResetMillis } = require('../utils/io-utils.js')

async function main() {
  let organizations = readFile('../json/organizations/organizations.json')
  let repoListLength = 0

  const checkTimer = async (rateLimitReset, requestsRemaining) => {
    if (requestsRemaining < 50) {
      const resetInMillis = rateLimitResetMillis(rateLimitReset)

      if (resetInMillis > 0) {
        // Log pause time.
        console.log(`Pausing for approximately ≈ ${Math.round(resetInMillis / 1000 / 60)} minutes.`)

        // Timer.
        await new Promise((resolve) => setTimeout(resolve, resetInMillis))
      }
    }
  }

  for (let i = 0; i < 150000; i++) {
    try {
      let organization = organizations[i].login

      // Get data.
      const res = await sendRequest(`https://api.github.com/orgs/${organization}/repos?per_page=100`)

      // Check and set timer if few requests.
      await checkTimer(res.headers['x-ratelimit-reset'], res.headers['x-ratelimit-remaining'])

      // Next iteration if empty data.
      if (res.data.length <= 0) continue

      // Filter repos on star count.
      const filteredRepos = res.data.filter((repo) => repo.stargazers_count > 50)

      // Next iteration no repos matching criteria.
      if (filteredRepos.length <= 0) continue

      // Write to file.
      if (repoListLength > 0) {
        await appendFile('../json/repositories/repositories.json', filteredRepos)
      } else {
        // Write directly to file if empty.
        await writeFile('../json/repositories/repositories.json', filteredRepos)
      }

      // Increment list length with newly added repos.
      repoListLength += filteredRepos.length

      // Quite if gathered more than 5000 filtered repos.
      if (repoListLength > 5000) break

      // Log success message.
      console.log(`${i + 1} iterations complete. ${repoListLength} repositories gathered.`)
    } catch (error) {
      console.log(error)
      continue
    }
  }
}

main()
