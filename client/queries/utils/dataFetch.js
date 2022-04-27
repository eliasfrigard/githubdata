import axios from 'axios'

// Fetch all data staring from an url.
export default async function getPaginatedData(url) {
  try {
    let data = []
    let results = []
    let next = true
    let page = 1

    while (next) {
      let pagedUrl = ''

      // Add pagination depending if url already has query parameters.
      if (url.includes('?')) {
        pagedUrl = `${url}&page=${page}`
      } else {
        pagedUrl = `${url}?page=${page}`
      }

      // Get data.
      let res = await axios.get(pagedUrl)

      data.push(...res.data)

      // Push data to return-array.
      results.push(JSON.parse(res.headers.measurement))

      // Set next and increment page.
      next = JSON.parse(res.headers.link).next
      page = page + 1
    }

    return {
      data: data,
      results: results,
    }
  } catch (error) {
    console.log(error)
  }
}
