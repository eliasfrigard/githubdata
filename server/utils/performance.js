import { cpuUsage, memoryUsage } from 'process'
import { writeFile, readFile } from './io-utils.js'

export const startMeasurement = () => {
  // Get the current time.
  const startTime = Date.now()

  // Start CPU usage measurement.
  const startUsage = cpuUsage()

  return {
    time: startTime,
    usage: startUsage,
  }
}

export const endMeasurement = (start) => {
  // Get the user cpu usage in milliseconds.
  const cpuUsed = cpuUsage(start.usage).user / 1000

  // Calculate the amount of heap memory used in MB.
  const memoryUsed = memoryUsage().heapUsed / 1024 / 1024

  // Return cpu usage in percentage and memory in MB.
  return {
    cpu: cpuUsed,
    memory: memoryUsed.toFixed(2),
  }
}
