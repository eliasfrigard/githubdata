const { sendRequest, readFile, writeFile } = require('../utils/io-utils.js')

const parse = require('parse-link-header')

async function main() {
  const repos = readFile('../json/repos.json')
  const batchLength = 125
  let rateLimitReset = 0
  let requestsRemaining = 5000
  let commitBatch = []
  let fileCount = 1

  for (let i = 0; i < repos.length; i++) {
    try {
      const commits = await getRepoCommits(repos[i].owner.login, repos[i].name)

      // Add commits to batch.
      commitBatch.push(commits)

      // Write to new file if X comments in batch or last iteration.
      if (commitBatch.length >= batchLength || i === repos.length - 1) {
        // Write to new file.
        await writeFile(
          `../json/commits/commits${fileCount}_b3.json`,
          commitBatch
        )

        // Increment  filecount, reset batch and set first file boolean.
        fileCount++
        commitBatch = []
      }

      // Log success message.
      console.log(
        `${i + 1} of ${repos.length} iterations complete. ${
          commits.commit_count
        } commits added. ${requestsRemaining} requests remaining. `
      )

      if (requestsRemaining < 50) {
        const resetInMillis = rateLimitResetMillis(rateLimitReset)

        if (resetInMillis > 0) {
          // Log pause time.
          console.log(
            `Pausing for ~ ${Math.round(resetInMillis / 1000 / 60)} minutes.`
          )

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
   * This function fetches and returns the number of commits for a specific repository.
   * @param {*} organization
   * @param {*} repo
   * @returns object with commit amount and details
   */
  async function getRepoCommits(organization, repo) {
    try {
      // How many results per page.
      const perPage = 100

      // Get data.
      const res = await sendRequest(
        `https://api.github.com/repos/${organization}/${repo}/commits?per_page=${perPage}`
      )

      // How many commits on FIRST page.
      const commitsOnPage = res.data.length

      // Links in parsed format.
      const parsedLinks = parse(res.headers.link)

      // Array of commits to return.
      let commits = {}

      if (parsedLinks === null) {
        // If only one page, create with this amount.
        commits = createCommits(commitsOnPage, organization, repo)
      } else {
        // If multiple pages.
        const lastPageUrl = parsedLinks.last.url
        const lastPageCommits = await sendRequest(lastPageUrl)
        const lastPageLength = lastPageCommits.data.length

        // Calculate total amount of commits for repo.
        const totalNumberOfCommits =
          (parsedLinks.last.page - 1) * perPage + lastPageLength

        // Create calculated number of commits.
        commits = createCommits(totalNumberOfCommits, organization, repo)
      }

      // Set remaining amount of requests and rate limit reset.
      requestsRemaining = res.headers['x-ratelimit-remaining']
      rateLimitReset = res.headers['x-ratelimit-reset']

      return commits
    } catch (error) {
      console.log(error)
    }
  }

  function createCommits(number, org, repo) {
    const commits = {
      repo: repo,
      organization: org,
      commit_count: number,
    }

    return commits
  }
}

main()
