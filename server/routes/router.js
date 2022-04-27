import express from 'express'
import createError from 'http-errors'

import { router as restRouter } from './rest-router.js'
import { router as graphqlRouter } from './graphql-router.js'

export const router = express.Router()

router.use('/', restRouter)
router.use('/graphql', graphqlRouter)

// Default to 404 if no route or resource was found.
router.use('*', (req, res, next) => {
  next(createError(404))
})
