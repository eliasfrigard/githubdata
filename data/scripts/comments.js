const { sendRequest, readDirectory, writeFile } = require('../utils/io-utils.js')

async function main(issues, iterationIndex) {
  // Variables.
  const batchLength = 3000
  let rateLimitReset = 0
  let requestsRemaining = 5000
  let commentBatch = []
  let fileCount = 1

  for (let i = 0; i < issues.length; i++) {
    try {
      // If issue has no comments, skip.
      if (issues[i].comment_count <= 0 && i !== issues.length - 1) continue

      // Call method to get comments.
      const comments = await getIssueComments(`${issues[i].comments_url}?per_page=100`, issues[i])

      // Add comments to batch.
      commentBatch.push(...comments)

      // Write to new file if X comments in batch.
      if (commentBatch.length > batchLength || i === issues.length - 1) {
        // Write to new file.
        await writeFile(`../json/comments/comments${iterationIndex}_${fileCount}_b3.json`, commentBatch)

        // Increment  filecount, reset batch and set first file boolean.
        fileCount++
        commentBatch = []
      }

      // Log success message.
      console.log(
        `${i + 1} of ${issues.length} iterations complete. ${
          comments.length
        } comments added. ${requestsRemaining} requests remaining.`
      )

      if (requestsRemaining < 50) {
        const resetInMillis = rateLimitResetMillis(rateLimitReset)

        if (resetInMillis > 0) {
          // Log pause time.
          console.log(`Pausing for approximately ≈ ${Math.round(resetInMillis / 1000 / 60)} minutes.`)

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
  async function getIssueComments(url, issue) {
    try {
      // Get data.
      let res = await sendRequest(url)

      // Set remaining amount of requests and rate limit reset.
      requestsRemaining = res.headers['x-ratelimit-remaining']
      rateLimitReset = res.headers['x-ratelimit-reset']

      // If no issues, skip rest of method.
      if (res.data.length <= 0) return []

      // Parse and return array of issues for that repo.
      return parseComments(res.data, issue)
    } catch (error) {
      console.log(error)
    }
  }

  function parseComments(commentsArray, issue) {
    let comments = []

    commentsArray.forEach((comment) => {
      const parsedIssues = {
        id: comment.id,
        body: comment.body,
        issue: {
          id: issue.id,
          number: issue.number,
          repo: issue.repo,
          organization: issue.organization,
        },
        author: {
          id: comment.user.id,
          login: comment.user.login,
          type: comment.user.type,
          url: comment.user.url,
        },
        created_at: comment.created_at,
      }

      comments.push(parsedIssues)
    })

    return comments
  }
}

async function wrapper() {
  const dirname = '../json/issues/'
  const issueFiles = readDirectory(dirname)

  console.log()
  // for (let i = 0; i < issueFiles.length; i++) {
  //   const file = readFile(dirname + issueFiles[i])

  //   await main(file, i)
  // }
}

wrapper()
