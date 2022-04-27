/**
 * This file is used to insert data into a MongoDB database.
 * Set connection to MongoDB in ./utils/mongoose.js or configure an environment variable.
 * Configure the list of directiories to the location of your collected Github data, starting at line 29.
 */

// Dependencies.
const { readFile, readDirectory } = require('./utils/io-utils.js')
const { connectDB, closeDB } = require('./utils/mongoose.js')
const { lorem } = require('./utils/lorem.js')

// Data directories.
const { Organization } = require('./models/organization.js')
const { Repository } = require('./models/repository.js')
const { Issue } = require('./models/issue.js')
const { Comment } = require('./models/comment.js')
const { Commit } = require('./models/commit.js')
const { Release } = require('./models/release.js')
const { Branch } = require('./models/branch.js')
const { Contribution } = require('./models/contribution.js')
const { User } = require('./models/user.js')
const { Language } = require('./models/language.js')

const main = async () => {
  // Connect to Mongo database.
  await connectDB()

  // Links to directories.
  const organizationDir = 'F:/Dokument/githubdata-json/organizations/'
  const repoDir = 'F:/Dokument/githubdata-json/repositories/'
  const issueDir = 'F:/Dokument/githubdata-json/issues/'
  const commentDir = 'F:/Dokument/githubdata-json/comments/'
  const commitDir = 'F:/Dokument/githubdata-json/commits/'
  const releaseDir = 'F:/Dokument/githubdata-json/releases/'
  const branchDir = 'F:/Dokument/githubdata-json/branches/'
  const contributionDir = 'F:/Dokument/githubdata-json/contributions/'
  const userDir = 'F:/Dokument/githubdata-json/users/'
  const languageDir = 'F:/Dokument/githubdata-json/languages/'

  // Read files from directory.
  const organizationFiles = readDirectory(organizationDir)
  const repoFiles = readDirectory(repoDir)
  const issueFiles = readDirectory(issueDir)
  const commentFiles = readDirectory(commentDir)
  const commitFiles = readDirectory(commitDir)
  const releaseFiles = readDirectory(releaseDir)
  const branchFiles = readDirectory(branchDir)
  const contributionFiles = readDirectory(contributionDir)
  const userFiles = readDirectory(userDir)
  const languageFiles = readDirectory(languageDir)

  // Run insert methods.
  const orgCount = await insertData(organizationFiles, organizationDir, 'organizations')
  const repoCount = await insertData(repoFiles, repoDir, 'repositories')
  const issueCount = await insertData(issueFiles, issueDir, 'issues')
  const commentCount = await insertData(commentFiles, commentDir, 'comments')
  const commitCount = await insertData(commitFiles, commitDir, 'commits')
  const releaseCount = await insertData(releaseFiles, releaseDir, 'releases')
  const branchCount = await insertData(branchFiles, branchDir, 'branches')
  const contributionCount = await insertData(contributionFiles, contributionDir, 'contributions')
  const userCount = await insertData(userFiles, userDir, 'users')
  const languageCount = await insertData(languageFiles, languageDir, 'languages')

  // Close mongo connection and log.
  await closeDB()
  console.log('Done!')
  console.log(`${orgCount} organizations stored.`)
  console.log(`${repoCount} repos stored.`)
  console.log(`${issueCount} issues stored.`)
  console.log(`${commentCount} comments stored.`)
  console.log(`${commitCount} commits stored.`)
  console.log(`${releaseCount} releases stored.`)
  console.log(`${branchCount} branches stored.`)
  console.log(`${contributionCount} contributions stored.`)
  console.log(`${userCount} users stored.`)
  console.log(`${languageCount} languages stored.`)
}

/**
 * Inserts data from an array of files.
 */
const insertData = async (files, dir, collection) => {
  let dataLength = 0

  // Go through the list of data files.
  for (let [index, file] of files.entries()) {
    try {
      // Read file.
      const data = readFile(dir + file)

      // Increment data count if not commit data.
      if (collection !== 'commits') dataLength += data.length

      // Inserts data to a specific collection.
      switch (collection) {
        case 'organizations':
          await Organization.collection.insertMany(data, { ordered: false })
          break
        case 'repositories':
          await Repository.collection.insertMany(parseRepos(data), {
            ordered: false,
          })
          break
        case 'issues':
          await Issue.collection.insertMany(data, { ordered: false })
          break
        case 'comments':
          await Comment.collection.insertMany(data, { ordered: false })
          break
        case 'releases':
          await Release.collection.insertMany(data, { ordered: false })
          break
        case 'branches':
          await Branch.collection.insertMany(data, { ordered: false })
          break
        case 'contributions':
          await Contribution.collection.insertMany(data, { ordered: false })
          break
        case 'users':
          await User.collection.insertMany(data, { ordered: false })
          break
        case 'languages':
          await Language.collection.insertMany(data, { ordered: false })
          break
        case 'commits':
          for (let i = 0; i < data.length; i++) {
            const array = []

            for (let j = 0; j < data[i].commit_count; j++) {
              array.push({
                repo: data[i].repo,
                organization: data[i].organization,
                message: lorem.generateSentences(1),
                created_at: randomDate(),
              })
            }

            // Increment commit data added.
            dataLength += array.length

            // Insert all commits for one repo.
            await Commit.collection.insertMany(array, { ordered: false })
          }
          break
      }

      // Log Success.
      console.log(
        `${data.length} ${collection} successfully stored. ${index + 1} of ${files.length} files processed.`
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  return dataLength
}

/**
 * Get random date between 2017 and now.
 */
const randomDate = () => {
  const start = new Date(2017, 0, 1)
  const end = new Date()

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const parseRepos = (repoArray) => {
  const newArray = repoArray

  for (let i = 0; i < newArray.length; i++) {
    repo = newArray[i]

    repo.created_at = new Date(repo.created_at)
  }

  return newArray
}

main()
