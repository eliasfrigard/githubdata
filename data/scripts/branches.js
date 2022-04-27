const { readFile, writeFile } = require('../utils/io-utils.js')
const { getDataRecursively } = require('../utils/gh-utils.js')

async function main() {
  const fileName = '../json/branches/branches'
  const repos = readFile('../json/repos.json')
  const batchLength = 1000
  let fileCount = 1
  let batch = []

  // Get data for every repo.
  for (let i = 0; i < repos.length; i++) {
    try {
      const organization = repos[i].owner.login
      const repo = repos[i].name

      // Get array of branches for repo.
      const { data, requestsRemaining } = await getDataRecursively(
        `https://api.github.com/repos/${organization}/${repo}/branches?per_page=100`
      )

      // Skip if no data.
      if (data.length <= 0) continue

      // Add data to batches.
      batch.push(...data)

      // Parse branches.
      batch = parseBranches(batch, repo, organization)

      // Write branch batch to file.
      if (batch.length >= batchLength || i === repos.length - 1) {
        // Write to new file.
        await writeFile(`${fileName}${fileCount}.json`, batch)

        // Increment filecount, reset batch and set first file boolean.
        batch = []
        fileCount++
      }

      // Log success message.
      console.log(
        `${i + 1} of ${repos.length} iterations complete. ${
          data.length
        } branches added. ${requestsRemaining} requests remaining. `
      )
    } catch (error) {
      console.log(error)
      continue
    }
  }
}

function parseBranches(branchArray, repo, organization) {
  let repoInfo = { repo: repo, organization: organization }

  // Add repoinfo to branches and return.
  return (branches = branchArray.map((branch) => (branch = { ...repoInfo, ...branch })))
}

main()
