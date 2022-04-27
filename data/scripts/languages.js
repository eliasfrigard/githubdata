const { sendRequest, readFile, writeFile, rateLimitResetMillis } = require('../utils/io-utils.js')

async function main() {
  const repos = readFile('../json/repos.json')
  const batchLength = 3000
  let rateLimitReset = 0
  let requestsRemaining = 0
  let languageBatch = []
  let fileCount = 1

  for (let i = 0; i < repos.length; i++) {
    try {
      // Get array of langugages for repo and add to batch.
      languageBatch.push(await getRepoLanguages(repos[i].owner.login, repos[i].name))

      // Write to new file if X comments in batch or last iteration.
      if (languageBatch.length > batchLength || i === repos.length - 1) {
        // Write to new file.
        await writeFile(`../json/languages/languages${fileCount}.json`, languageBatch)

        // Increment  filecount, reset batch and set first file boolean.
        fileCount++
        languageBatch = []
      }

      // Log success message.
      console.log(`${i + 1} of ${repos.length} iterations complete. ${requestsRemaining} requests remaining.`)

      if (requestsRemaining < 10) {
        const resetInMillis = rateLimitResetMillis(rateLimitReset)

        if (resetInMillis > 0) {
          // Log pause time.
          console.log(`Pausing for ~ ${Math.round(resetInMillis / 1000 / 60)} minutes.`)

          // Timer.
          await new Promise((resolve) => setTimeout(resolve, resetInMillis))
        }
      }
    } catch (error) {
      console.log(error)
      continue
    }
  }

  /**
   * This function fetches and returns an array of issues for a specific repository.
   * @param {*} organization
   * @param {*} repo
   * @returns array of issues for specific repo
   */
  async function getRepoLanguages(organization, repo) {
    try {
      // Get data.
      let res = await sendRequest(`https://api.github.com/repos/${organization}/${repo}/languages`)

      // Set remaining amount of requests and rate limit reset.
      requestsRemaining = res.headers['x-ratelimit-remaining']
      rateLimitReset = res.headers['x-ratelimit-reset']

      // Parse and return array of issues for that repo.
      return {
        repo: repo,
        organization: organization,
        languages: res.data,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

main()
