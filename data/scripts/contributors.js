const { readFile, writeFile } = require('../utils/io-utils.js')
const { getDataRecursively } = require('../utils/gh-utils.js')

async function main() {
  const userFileName = '../json/users/users'
  const contributionFileName = '../json/contributions/contributions'
  const repos = readFile('../json/repos.json')
  const batchLength = 1000
  let contributionBatch = []
  let userBatch = []
  let userFileCount = 1
  let contributionFileCount = 1

  for (let i = 0; i < repos.length; i++) {
    try {
      const organization = repos[i].owner.login
      const repo = repos[i].name

      // Get array of contributors for repo.
      const { data, requestsRemaining } = await getDataRecursively(
        `https://api.github.com/repos/${organization}/${repo}/contributors?per_page=100`
      )

      // Skip if no data.
      if (data.length <= 0) continue

      // Parse the relations between repos and contributors.
      const contributions = parseRelations(organization, repo, data)

      // Get all users who have contributed to a project.
      userBatch.push(...data)

      // Add single contributors object per repo.
      contributionBatch.push(contributions)

      // WRITE USERS TO FILE
      if (userBatch.length >= batchLength || i === repos.length - 1) {
        // Write to new file.
        await writeFile(`${userFileName}${userFileCount}.json`, userBatch)

        // Increment filecount, reset batch and set first file boolean.
        userFileCount++
        userBatch = []
      }

      // WRITE CONTRIBUTIONS TO FILE.
      if (contributionBatch.length >= batchLength || i === repos.length - 1) {
        // Write to new file.
        await writeFile(`${contributionFileName}${contributionFileCount}.json`, contributionBatch)

        // Increment filecount, reset batch and set first file boolean.
        contributionFileCount++
        contributionBatch = []
      }

      // Log success message.
      console.log(
        `${i + 1} of ${repos.length} iterations complete. ${
          data.length
        } contributors added. ${requestsRemaining} requests remaining. `
      )
    } catch (error) {
      console.log(error)
      continue
    }
  }

  function parseRelations(organization, repo, contributors) {
    return {
      repo: repo,
      organization: organization,
      contributors: contributors.map((el) => el.id),
    }
  }
}

main()
