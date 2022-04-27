const mongoose = require('mongoose')

/**
 * Creates a connection to MongoDB through mongoose.
 * Connection string must be declared in .env file.
 *
 * @returns {object} Mongoose connection object.
 */
const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connection is open.')
  })

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error has occurred: ${err}`)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
  })

  // If the Node process ends, close the Mongoose connection.
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection is disconnected due to application termination.')
      process.exit(0)
    })
  })

  // Connect to the server.
  return mongoose.connect('mongodb://localhost:27017/githubdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

const closeDB = async () => {
  // Connect to the server.
  return mongoose.disconnect()
}

module.exports = {
  connectDB,
  closeDB,
}
