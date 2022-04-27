const { readFile, writeFile } = require('../utils/io-utils.js')
const { getDataRecursively } = require('../utils/gh-utils.js')

async function main() {
  const fileName = '../json/releases/releases'
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
        `https://api.github.com/repos/${organization}/${repo}/releases?per_page=100`
      )

      // Skip if no data.
      if (data.length <= 0) continue

      // Add data to batches.
      batch.push(...data)

      // Parse releases.
      batch = parseReleases(batch, repo, organization)

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
        } releases added. ${requestsRemaining} requests remaining. `
      )
    } catch (error) {
      console.log(error)
      continue
    }
  }
}

function parseReleases(releaseArray, repo, organization) {
  let releases = []

  releaseArray.forEach((release) => {
    const parsedRelease = {
      id: release.id,
      node_id: release.node_id,
      tag_name: release.tag_name,
      name: release.name,
      body: release.body,
      draft: release.draft,
      prerelease: release.prerelease,
      repo: repo,
      organization: organization,
      created_at: release.created_at,
      published_at: release.published_at,
    }

    releases.push(parsedRelease)
  })

  return releases
}

main()
