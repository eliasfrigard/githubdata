import mongoQueries from '../mongodb/queries.js'

function setPaginationHeaders(res, count, page, limit) {
  // Making sure all variables are integers.
  count = parseInt(count)
  page = parseInt(page)
  limit = parseInt(limit)

  // Calculate the last page.
  const lastPage = Math.ceil(count / limit)

  const links = {
    count: count,
    last: {
      page: lastPage,
      limit: limit,
      rel: 'last',
    },
    ...(page < lastPage && {
      next: {
        page: page + 1,
        limit: limit,
        rel: 'next',
      },
    }),
  }

  res.set('Link', JSON.stringify(links))
}

export class RestController {
  /**
   * Search for repos using some predefined parameters.
   */
  async searchRepos(req, res, next) {
    //* Done.
    try {
      // Parameters.
      const page = req.query.page || 1
      const limit = req.query.limit || 100

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: req.query.sort || 'id',
        direction: req.query.direction || 'asc',
        ...(req.query.language && { language: req.query.language }),
        ...(req.query.stars && { stars: parseInt(req.query.stars) }),
        ...(req.query.size && { size: parseInt(req.query.size) }),
        ...(req.query.before && { before: req.query.before }),
      }

      // Use common method to interact with database.
      // Inject parameters as options-object.
      const { data, count } = await mongoQueries.getRepos(options)

      // Set headers for pagination.
      setPaginationHeaders(res, count, page, limit)

      // Return repos data.
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get all contributors for a organization or repo.
   */
  async contributors(req, res, next) {
    //* Done.
    try {
      const page = req.query.page || 1
      const limit = req.query.limit || 100

      // Use common method to interact with database.
      const { data, count } = await mongoQueries.getContributors({
        page: parseInt(page),
        limit: parseInt(limit),
        sort: req.query.sort || 'login',
        direction: req.query.direction || 'asc',
        organization: req.params.org,
        repo: req.params.repo,
      })

      // Set headers for pagination.
      setPaginationHeaders(res, count, page, limit)

      // Return contributor data.
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get information about a specific repository.
   */
  async repo(req, res, next) {
    //* Done.
    try {
      const repo = await mongoQueries.getRepo({ organization: req.params.org, repo: req.params.repo })

      // Return repository.
      res.send(repo)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get a list of languages for a specific repository.
   */
  async languages(req, res, next) {
    //* Done.
    try {
      // Get all languages for a specific repository.
      const languages = await mongoQueries.getLanguages({
        repo: req.params.repo,
        organization: req.params.org,
      })

      // Return repository.
      res.send(languages)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get a single pull requests for a specific repository.
   */
  async repoPullSingle(req, res, next) {
    //* Done.
    try {
      const pull = await mongoQueries.getIssue({
        repo: req.params.repo,
        organization: req.params.org,
        number: req.params.number,
        type: 'pull',
      })

      // Return repository.
      res.send(pull)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get all issues or pull requests for a specific repository.
   */
  async issues(req, res, next) {
    //* Done
    try {
      // Parameters.
      const page = req.query.page || 1
      const limit = req.query.limit || 100

      // Use common method to interact with database.
      const { data, count } = await mongoQueries.getIssues({
        page: parseInt(page),
        limit: parseInt(limit),
        sort: req.query.sort || 'created_at',
        direction: req.query.direction || 'desc',
        organization: req.params.org,
        repo: req.params.repo,
        ...(req.originalUrl.includes('pulls') && { type: 'pull' }),
        ...(req.originalUrl.includes('issues') && { type: 'issue' }),
        ...(req.query.state && req.query.state != 'all' && { state: req.query.state }),
        ...(req.query.label && { label: req.query.label }),
      })

      // Set headers for pagination.
      setPaginationHeaders(res, count, page, limit)

      // Return repository.
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get all commits for a specific repository.
   */
  async repoCommits(req, res, next) {
    //* Done.
    try {
      // Parameters.
      const page = req.query.page || 1
      const limit = req.query.limit || 100

      // Use common method to interact with database.
      const { data, count } = await mongoQueries.getCommits({
        page: parseInt(page),
        limit: parseInt(limit),
        organization: req.params.org,
        repo: req.params.repo,
      })

      // Set headers for pagination.
      setPaginationHeaders(res, count, page, limit)

      // Return releases.
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get all branches for a specific repository.
   */
  async repoBranches(req, res, next) {
    //* Done.
    try {
      // Parameters.
      const page = req.query.page || 1
      const limit = req.query.limit || 100

      // Use common method to interact with database.
      const { data, count } = await mongoQueries.getBranches({
        page: parseInt(page),
        limit: parseInt(limit),
        sort: req.query.sort || 'name',
        direction: req.query.direction || 'asc',
        organization: req.params.org,
        repo: req.params.repo,
      })

      // Set headers for pagination.
      setPaginationHeaders(res, count, page, limit)

      // Return releases.
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get all releases for a specific repository.
   */
  async repoReleases(req, res, next) {
    //* Done.
    try {
      // Parameters.
      const page = req.query.page || 1
      const limit = req.query.limit || 100

      // Use common method to interact with database.
      const { data, count } = await mongoQueries.getReleases({
        page: parseInt(page),
        limit: parseInt(limit),
        sort: req.query.sort || 'created_at',
        direction: req.query.direction || 'desc',
        organization: req.params.org,
        repo: req.params.repo,
      })

      // Set headers for pagination.
      setPaginationHeaders(res, count, page, limit)

      // Return releases.
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get all comments for issue(s).
   */
  async issueComments(req, res, next) {
    //* Done
    try {
      // Parameters.
      const page = req.query.page || 1
      const limit = req.query.limit || 100

      // Use common method to interact with database.
      const { data, count } = await mongoQueries.getComments({
        page: parseInt(page),
        limit: parseInt(limit),
        organization: req.params.org,
        repo: req.params.repo,
        ...(req.params.number && { number: req.params.number }),
      })

      // Set headers for pagination.
      setPaginationHeaders(res, count, page, limit)

      // Return repository.
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
