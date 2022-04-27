import express from 'express'
import { RestController } from '../controllers/rest-controller.js'

export const router = express.Router()
const controller = new RestController()

//* Done.
// Search for repos using some predefined parameters.
router.get('/search/repositories', (req, res, next) => controller.searchRepos(req, res, next))

//* Done.
// Get information about a specific repository.
router.get('/repos/:org/:repo', (req, res, next) => controller.repo(req, res, next))

//* Done.
// Get a list of languages for a specific repository.
router.get('/repos/:org/:repo/languages', (req, res, next) => controller.languages(req, res, next))

//* Done.
// Get all pull requests for a specific repository.
router.get('/repos/:org/:repo/pulls', (req, res, next) => controller.issues(req, res, next))

//* Done.
// Get a single pull requests for a specific repository.
router.get('/repos/:org/:repo/pulls/:number', (req, res, next) => controller.repoPullSingle(req, res, next))

//* Done.
// Get all contributors for a specific repository.
router.get('/repos/:org/:repo/contributors', (req, res, next) => controller.contributors(req, res, next))

//* Done.
// Get all commits for a specific repository.
router.get('/repos/:org/:repo/commits', (req, res, next) => controller.repoCommits(req, res, next))

//* Done.
// Get all branches for a specific repository.
router.get('/repos/:org/:repo/branches', (req, res, next) => controller.repoBranches(req, res, next))

//* Done.
// Get all releases for a specific repository.
router.get('/repos/:org/:repo/releases', (req, res, next) => controller.repoReleases(req, res, next))

//* Done.
// Get all issues for a specific repository.
router.get('/repos/:org/:repo/issues', (req, res, next) => {
  controller.issues(req, res, next)
})

//* Done.
// Get all comments for all issues in a specific repository.
router.get('/repos/:org/:repo/issues/comments', (req, res, next) => controller.issueComments(req, res, next))

//* Done.
// Get all comments for a single issue in a specific repository.
router.get('/repos/:org/:repo/issues/:number/comments', (req, res, next) =>
  controller.issueComments(req, res, next)
)
