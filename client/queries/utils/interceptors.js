import { startMeasurement, endMeasurement } from './performance.js'
import axios from 'axios'

export const interceptRequest = () => {
  axios.interceptors.request.use(
    // Intercept request to start performance measurement.
    (config) => {
      // Start measurement and add as metadata.
      config.metadata = startMeasurement()

      // Return config object.
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export const interceptResponse = () => {
  // Add a response interceptor
  axios.interceptors.response.use(
    async (response) => {
      // End response time measurement.
      const end = endMeasurement(response.config.metadata)

      // Combine response time measurement with CPU and Memory measurement.
      const measurement = { ...JSON.parse(response.headers.measurement), response: end.time }

      // Re-add the header with the local measurements.
      response.headers.measurement = JSON.stringify(measurement)

      // Return response to function.
      return response
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause an error.
      return Promise.reject(error)
    }
  )
}
