const parse = require('parse-link-header')

async function getDataRecursively(url) {
  try {
    // Get data.
    const res = await sendRequest(url)

    // Get rate limit information.
    const requestsRemaining = res.headers['x-ratelimit-remaining']
    const rateLimitReset = res.headers['x-ratelimit-reset']

    // If no data, skip rest of method.
    if (res.data.length <= 0) {
      return { data: [], requestsRemaining, rateLimitReset }
    }

    // Links in parsed format.
    const parsedLinks = parse(res.headers.link)

    // Array from data.
    let data = res.data

    // Go recursively through pages.
    if (parsedLinks !== null) {
      if (parsedLinks.next) {
        data.push(...(await getDataRecursively(parsedLinks.next.url)).data)
      }
    }

    // Check remaining rate limit.
    await rateLimitCheck(requestsRemaining, rateLimitReset)

    // Return array of contributors.
    return { data, requestsRemaining, rateLimitReset }
  } catch (error) {
    console.log(error)
  }
}

/**
 * This function checks how many requests are remaining and sets timer until next reset.
 * @param {*} requestsRemaining
 * @param {*} rateLimitReset
 */
async function rateLimitCheck(requestsRemaining, rateLimitReset) {
  if (requestsRemaining < 10) {
    const resetInMillis = rateLimitResetMillis(rateLimitReset)

    if (resetInMillis > 0) {
      // Log pause time.
      console.log(`Pausing for ~ ${Math.round(resetInMillis / 1000 / 60)} minutes.`)

      // Timer.
      await new Promise((resolve) => setTimeout(resolve, resetInMillis))
    }
  }
}

module.exports = {
  getDataRecursively,
  rateLimitCheck,
}
