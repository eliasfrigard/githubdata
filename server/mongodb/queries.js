// Import Mongoose Models.
import Repository from '../models/repository.js'
import Issue from '../models/issue.js'
import Language from '../models/language.js'
import Release from '../models/release.js'
import Commit from '../models/commit.js'
import Branch from '../models/branch.js'
import Comment from '../models/comment.js'
import User from '../models/user.js'
import Contribution from '../models/contribution.js'

const getRepo = async (options) => {
  const query = {
    full_name: `${options.organization}/${options.repo}`,
  }

  // Find repo matching the criteria.
  return await Repository.findOne(query)
}

const getLanguages = async (options) => {
  // Define search query.
  const query = {
    repo: options.repo,
    organization: options.organization,
  }

  // Find the language object of one repo.
  const languages = await Language.findOne(query)

  // If no entry was found in mongodb.
  if (!languages) {
    return []
  }

  let langArray = []

  // Make object values and keys into array of objects.
  for (const [key, value] of Object.entries(...languages)) {
    langArray.push({ name: key, id: value })
  }

  return [...langArray]
}

const getRepos = async (options) => {
  // Define search query.
  const query = {
    // Find repos with this main language.
    ...(options.language && { language: options.language }),
    // Find repos with more stars than value.
    ...(options.stars && { stargazers_count: { $gte: options.stars } }),
    // Find repos with size bigger than value.
    ...(options.size && { size: { $gte: options.size } }),
    // Find repos created before date.
    ...(options.before && { created_at: { $lte: new Date(options.before) } }),
  }

  // Query the database for branches.
  let [dbRes] = await Repository.aggregate()
    // Match with search query.
    .match(query)
    // Sort according to specified attribute.
    .sort({ [options.sort]: options.direction === 'asc' ? 1 : -1 })
    // Return both data and total object count.
    .facet({
      data: [{ $skip: options.limit * (options.page - 1) }, { $limit: options.limit }],
      meta: [{ $count: 'count' }],
    })
    // Add field to make count easier to access.
    .addFields({
      count: {
        $ifNull: [{ $arrayElemAt: ['$meta.count', 0] }, 0],
      },
    })

  return {
    data: dbRes.data,
    count: dbRes.count,
  }
}

const getIssue = async (options) => {
  const query = {
    repo: options.repo,
    organization: options.organization,
    number: options.number,
    ...(options.type && { type: options.type }),
  }

  return await Issue.findOne(query)
}

const getIssues = async (options) => {
  // Design the query object.
  const query = {
    // Mandatory repo and org params.
    repo: options.repo,
    organization: options.organization,
    // Filter issue by type (issue or pull).
    ...(options.type && { type: options.type }),
    // Filter issue by state (open, closed, all).
    ...(options.state && options.state !== 'all' && { state: options.state }),
    // Filter issue by label (e.g. "bug").
    ...(options.label && { labels: { $elemMatch: { name: options.label } } }),
  }

  // Query the database for branches.
  let [dbRes] = await Issue.aggregate()
    .match(query)
    // .sort({ [options.sort]: options.direction === 'asc' ? 1 : -1 })
    .facet({
      data: [{ $skip: options.limit * (options.page - 1) }, { $limit: options.limit }],
      meta: [{ $count: 'count' }],
    })
    .addFields({
      count: {
        $ifNull: [{ $arrayElemAt: ['$meta.count', 0] }, 0],
      },
    })

  return {
    data: dbRes.data,
    count: dbRes.count,
  }
}

const getReleases = async (options) => {
  // Design the query object.
  const query = {
    repo: options.repo,
    organization: options.organization,
  }

  // Query the database for branches.
  let [dbRes] = await Release.aggregate()
    .match(query)
    .sort({ [options.sort]: options.direction === 'asc' ? 1 : -1 })
    .facet({
      data: [{ $skip: options.limit * (options.page - 1) }, { $limit: options.limit }],
      meta: [{ $count: 'count' }],
    })
    .addFields({
      count: {
        $ifNull: [{ $arrayElemAt: ['$meta.count', 0] }, 0],
      },
    })

  return {
    data: dbRes.data,
    count: dbRes.count,
  }
}

const getContributors = async (options) => {
  // Get user ids from the collection of repo/contributor relations.
  let contributions = await Contribution.findOne({
    organization: options.organization,
    ...(options.repository && { repo: options.repository }),
  })

  // If no entry was found in mongodb.
  if (!contributions) {
    return {
      data: [],
      count: 0,
    }
  }

  // Design the query object.
  const query = {
    id: {
      $in: contributions.contributors,
    },
  }

  // Query the database for branches.
  let [dbRes] = await User.aggregate()
    .match(query)
    .sort({ [options.sort]: options.direction === 'asc' ? 1 : -1 })
    .facet({
      data: [{ $skip: options.limit * (options.page - 1) }, { $limit: options.limit }],
      meta: [{ $count: 'count' }],
    })
    .addFields({
      count: {
        $ifNull: [{ $arrayElemAt: ['$meta.count', 0] }, 0],
      },
    })

  return {
    data: dbRes.data,
    count: dbRes.count,
  }
}

const getBranches = async (options) => {
  // Design the query object.
  const query = {
    repo: options.repo,
    organization: options.organization,
  }

  // Query the database for branches.
  let [dbRes] = await Branch.aggregate()
    .match(query)
    .sort({ [options.sort]: options.direction === 'asc' ? 1 : -1 })
    .facet({
      data: [{ $skip: options.limit * (options.page - 1) }, { $limit: options.limit }],
      meta: [{ $count: 'count' }],
    })
    .addFields({
      count: {
        $ifNull: [{ $arrayElemAt: ['$meta.count', 0] }, 0],
      },
    })

  return {
    data: dbRes.data,
    count: dbRes.count,
  }
}

const getCommits = async (options) => {
  // Design the query object.
  const query = {
    repo: options.repo,
    organization: options.organization,
  }

  // Query the database for commits.
  let [dbRes] = await Commit.aggregate()
    .match(query)
    .facet({
      data: [{ $skip: options.limit * (options.page - 1) }, { $limit: options.limit }],
      meta: [{ $count: 'count' }],
    })
    .addFields({
      count: {
        $ifNull: [{ $arrayElemAt: ['$meta.count', 0] }, 0],
      },
    })

  return {
    data: dbRes.data,
    count: dbRes.count,
  }
}

const getComments = async (options) => {
  // Design the query object.
  const query = {
    'issue.repo': options.repo,
    'issue.organization': options.organization,
    ...(options.number && { 'issue.number': parseInt(options.number) }),
  }

  // Query the database for comments.
  let dbRes = await Comment.aggregate()
    .match(query)
    .facet({
      data: [{ $skip: options.limit * (options.page - 1) }, { $limit: options.limit }],
      meta: [{ $count: 'count' }],
    })
    .addFields({
      count: {
        $ifNull: [{ $arrayElemAt: ['$meta.count', 0] }, 0],
      },
    })

  return {
    data: dbRes.data,
    count: dbRes.count,
  }
}

export default {
  getRepos,
  getIssue,
  getIssues,
  getRepo,
  getLanguages,
  getReleases,
  getCommits,
  getBranches,
  getComments,
  getContributors,
}
