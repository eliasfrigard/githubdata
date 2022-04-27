// import { writeFile, readFile, appendFile } from './io-utils.js'

export const startMeasurement = () => {
  // Start performance measurements.
  const startTime = Date.now()

  return {
    time: startTime,
  }
}

export const endMeasurement = (startMeasurement) => {
  // End performance measurements.
  const totalTime = Date.now() - startMeasurement.time

  return {
    time: totalTime,
  }
}

// export const saveMeasurement = async (measurement, api, queryName, iteration) => {
//   const fileName = `./results/${api}/${queryName}/${iteration}.json`

//   // Get the already written data.
//   const fileData = readFile(fileName)

//   if (fileData.length > 0) {
//     await writeFile(fileName, [...fileData, measurement])
//   } else {
//     await writeFile(fileName, [measurement])
//   }
// }
