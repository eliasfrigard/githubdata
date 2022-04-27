const { sendRequest, readFile, writeFile, rateLimitResetMillis } = require('../utils/io-utils.js')

const parse = require('parse-link-header')

async function main() {
  const repos = readFile('../json/repos.json')
  const batchLength = 3000
  let rateLimitReset = 0
  let requestsRemaining = 5000
  let issueBatch = []
  let fileCount = 1

  for (let i = 0; i < repos.length; i++) {
    try {
      console.log(`Fetching issues for ${repos[i].name} / ${repos[i].owner.login}...`)

      // Get issues for repo.
      const issues = await getRepoIssues(repos[i].owner.login, repos[i].name)

      // Add issues to batch.
      issueBatch.push(...issues)

      // Write to new file if X comments in batch or last iteration.
      if (issueBatch.length > batchLength || i === repos.length - 1) {
        // Write to new file.
        await writeFile(`../json/issues/issues${fileCount}_b3.json`, issueBatch)

        // Increment  filecount, reset batch and set first file boolean.
        fileCount++
        issueBatch = []
      }

      // Log success message.
      console.log(
        `${i + 1} of ${repos.length} iterations complete. ${
          issues.length
        } issues added. ${requestsRemaining} requests remaining.`
      )

      if (requestsRemaining < 50) {
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
  async function getRepoIssues(organization, repo) {
    try {
      // How many results per page.
      const perPage = 100

      // Get data.
      let res = await sendRequest(
        `https://api.github.com/repos/${organization}/${repo}/issues?per_page=${perPage}&state=all`
      )

      // If no issues, skip rest of method.
      if (res.data.length <= 0) return []

      // Array of commits to return.
      const issuesArray = []

      // Push issues to array.
      issuesArray.push(...res.data)

      // Links in parsed format.
      let parsedLinks = parse(res.headers.link)

      // Go through all pages of issues and add them.
      if (parsedLinks !== null) {
        let pagesFetched = 0

        // While next and max ten pages total.
        while (parsedLinks.next && pagesFetched < 9) {
          pagesFetched++

          // Get data.
          res = await sendRequest(parsedLinks.next.url)

          // If no issues, skip rest of method.
          if (res.data.length <= 0) return

          // Push issues to array.
          issuesArray.push(...res.data)

          // Links in parsed format.
          parsedLinks = parse(res.headers.link)
        }
      }

      // Set remaining amount of requests and rate limit reset.
      requestsRemaining = res.headers['x-ratelimit-remaining']
      rateLimitReset = res.headers['x-ratelimit-reset']

      // Parse and return array of issues for that repo.
      return parseIssues(issuesArray, repo, organization)
    } catch (error) {
      console.log(error)
    }
  }

  function parseIssues(issueArray, repo, organization) {
    let issues = []

    issueArray.forEach((issue) => {
      const parsedIssues = {
        id: issue.id,
        number: issue.number,
        title: issue.title,
        body: issue.body,
        type: issue.pull_request ? 'pull' : 'issue',
        pull_urL: issue.pull_request ? issue.pull_request.url : null,
        state: issue.state,
        author: {
          id: issue.user.id,
          login: issue.user.login,
          type: issue.user.type,
          url: issue.user.url,
        },
        labels: issue.labels,
        repo: repo,
        organization: organization,
        comments_url: issue.comments_url,
        comment_count: issue.comments,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        closed_at: issue.closed_at,
      }

      issues.push(parsedIssues)
    })

    return issues
  }
}

main()
