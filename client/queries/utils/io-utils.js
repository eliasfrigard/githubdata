import axios from 'axios'
import fs from 'fs'

/**
 * @param filename read file with this name from the system.
 * @returns array of json
 */
export const readFile = (filename) => {
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

export const readDirectory = (dirname) => {
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
export const writeFile = async (filename, array) => {
  fs.writeFileSync(filename, JSON.stringify(array), (error) => {
    if (error) throw error
  })
}

export const appendFile = async (filename, array) => {
  // Get the already written data.
  const fileData = readFile(filename)

  // Append new with old.
  const concatenated = [...fileData, ...array]

  // Write appended data.
  await writeFile(filename, concatenated)
}

export const sendRequest = async (url) => {
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
