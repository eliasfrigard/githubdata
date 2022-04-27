// Performance dependencies.
import { startMeasurement, endMeasurement } from './utils/performance.js'

// Server dependencies.
import { router } from './routes/router.js'
import { connectDB } from './utils/mongoose.js'

// Importing necessary dependencies.
import express from 'express'
import logger from 'morgan'

const main = async () => {
  // Connect to database.
  await connectDB()

  // Initialize Express.
  const app = express()

  // Use Morgan dev logger.
  app.use(logger('dev'))

  // Middleware for measuing CPU and RAM utilization.
  app.use((req, res, next) => {
    // Start measurement
    const start = startMeasurement()

    // Intercept send.
    let oldSend = res.send

    // Modify send to add performance measurement.
    res.send = (data) => {
      // End measurement.
      const measurement = endMeasurement(start)

      // Set function back to avoid double send.
      res.send = oldSend

      // Attach measurement results as headers.
      res.set('measurement', JSON.stringify(measurement))

      // Send data to client.
      return res.send(data)
    }
    next()
  })

  // Use HTTP router.
  app.use('/', router)

  // Starts the HTTP server listening for connections.
  app.listen(5000, () => {
    console.log(`Server running at http://localhost:5000`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main()
