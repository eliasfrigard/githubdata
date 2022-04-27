const axios = require('axios').default
const fs = require('fs')

/**
 * @param filename read file with this name from the system.
 * @returns array of json
 */
readFile = (filename) => {
  try {
    if (fs.existsSync(filename)) {
      const file = fs.readFileSync(filename, 'utf-8')
      return JSON.parse(file)
    }

    return []
  } catch (error) {
    console.log(error)
  }
}

readDirectory = (dirname) => {
  try {
    return fs.readdirSync(dirname)
  } catch (error) {
    console.log(error)
  }
}

/**
 * @param filename name of the file to write.
 * @param array array to write.
 */
writeFile = async (filename, array) => {
  fs.writeFile(filename, JSON.stringify(array), (error) => {
    if (error) throw error
  })
}

appendFile = async (filename, array) => {
  // Get the already written data.
  const fileData = readFile(filename)

  // Append new with old.
  const concatenated = [...fileData, ...array]

  // Write appended data.
  await writeFile(filename, concatenated)
}

sendRequest = async (url) => {
  return await axios
    .get(url, {
      auth: {
        username: 'eliasfrigard',
        password: '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',
      },
    })
    .catch((error) => {
      console.log(error)
    })
}

rateLimitResetMillis = (resetTime) => {
  const millisUntilReset = resetTime * 1000 - Date.now()

  // Add minute for safety and return.
  return millisUntilReset + 60000
}

module.exports = {
  writeFile,
  readFile,
  sendRequest,
  appendFile,
  readDirectory,
  rateLimitResetMillis,
}
