import { interceptRequest, interceptResponse } from "./queries/utils/interceptors.js"
import { writeFile } from "./queries/utils/io-utils.js"
import ProgressBar from "./queries/utils/progress-ui.js"

// Warmup script.
import { warmupRest, warmupGraphQL } from "./queries/utils/warmup.js"

// Import REST queries.
import rest1 from "./queries/REST/rest1.js"
import rest2 from "./queries/REST/rest2.js"
import rest3 from "./queries/REST/rest3.js"
import rest4 from "./queries/REST/rest4.js"
import rest5 from "./queries/REST/rest5.js"
import rest6 from "./queries/REST/rest6.js"
import rest7 from "./queries/REST/rest7.js"
import rest8 from "./queries/REST/rest8.js"
import rest9 from "./queries/REST/rest9.js"
import rest10 from "./queries/REST/rest10.js"
import rest11 from "./queries/REST/rest11.js"
import rest12 from "./queries/REST/rest12.js"
import rest13 from "./queries/REST/rest13.js"
import rest14 from "./queries/REST/rest14.js"

// Import GraphQL queries.
import graph1 from "./queries/GraphQL/graph1.js"
import graph2 from "./queries/GraphQL/graph2.js"
import graph3 from "./queries/GraphQL/graph3.js"
import graph4 from "./queries/GraphQL/graph4.js"
import graph5 from "./queries/GraphQL/graph5.js"
import graph6 from "./queries/GraphQL/graph6.js"
import graph7 from "./queries/GraphQL/graph7.js"
import graph8 from "./queries/GraphQL/graph8.js"
import graph9 from "./queries/GraphQL/graph9.js"
import graph10 from "./queries/GraphQL/graph10.js"
import graph11 from "./queries/GraphQL/graph11.js"
import graph12 from "./queries/GraphQL/graph12.js"
import graph13 from "./queries/GraphQL/graph13.js"
import graph14 from "./queries/GraphQL/graph14.js"

// GraphQL query for testing over-fetching performance.
import graph15 from "./queries/GraphQL/graph15.js"

const restQueries = [
  rest1,
  rest2,
  rest3,
  rest4,
  rest5,
  rest6,
  rest7,
  rest8,
  rest9,
  rest10,
  rest11,
  rest12,
  rest13,
  rest14,
]

const graphQueries = [
  graph1,
  graph2,
  graph3,
  graph4,
  graph5,
  graph6,
  graph7,
  graph8,
  graph9,
  graph10,
  graph11,
  graph12,
  graph13,
  graph14,
]

const iterationCounts = [
  10000, // Q1
  250, // Q2
  10, // Q3
  10000, // Q4
  2500, // Q5
  10000, // Q6
  2500, // Q7
  2500, // Q8
  5000, // Q9
  1000, // Q10
  150, // Q11
  5000, // Q12
  10000, // Q13
  5000, // Q14
]

async function runTestSuite(testSuiteIteration) {
  // Use interceptors for performance measurements.
  interceptRequest()
  interceptResponse()

  if (restQueries.length != graphQueries.length) {
    console.log("Not equal amounts of tests for both APIs! Aborting...")
  }

  // Run REST tests.
  for (let i = 0; i < restQueries.length; i++) {
    // Run warmup.
    await warmupRest(250)

    // // Run REST queries.
    await runTestMethod(restQueries[i], iterationCounts[i], "REST", `Q${i + 1}`, testSuiteIteration)
  }

  // Run GraphQL tests.
  for (let i = 0; i < graphQueries.length; i++) {
    // Run warmup.
    await warmupGraphQL(250)

    // // Run REST queries.
    await runTestMethod(graphQueries[i], iterationCounts[i], "GraphQL", `Q${i + 1}`, testSuiteIteration)
  }

  // Run warmup.
  await warmupGraphQL(250)

  // Test over-fetching.
  await runTestMethod(graph15, iterationCounts[0], "GraphQL", "Q15", testSuiteIteration)
}

const runTestMethod = async (method, iterations, api, query, testSuiteNumber) => {
  console.log("")
  console.log(`=================== Test Suite ${testSuiteNumber} ==================`)
  console.log("===================================================")
  console.log(`============ Running Tests for ${api} ${query} ============`)
  console.log("")

  // Start new progress bar.
  const progressBar = new ProgressBar(iterations)

  // Start progress bar.
  progressBar.start()

  // Array to store batch of results and index of file to write.
  let results = []
  let fileNumber = 1

  // Run test a specified amount of times.
  for (let index = 0; index < iterations; index++) {
    // Run test and expect array of results back.
    const measurements = await method()

    // Add result to array.
    results.push(...measurements)

    // Update progress bar.
    progressBar.update(index + 1)

    // Save results if batch is large.
    if (results.length >= 5000) {
      // Save.
      await save(results, api, query, fileNumber, testSuiteNumber)

      // Reset results and increment file number.
      results = []
      fileNumber++
    }
  }

  // Stop progress bar.
  progressBar.stop()

  // Save the remaining reults.
  await save(results, api, query, fileNumber, testSuiteNumber)
}

const save = async (array, api, query, fileNumber, testSuiteNumber) => {
  // Write results to file.
  await writeFile(`./results/${api}/${query}/${testSuiteNumber}_${fileNumber}.json`, array)
}

async function main() {
  // Run test suite 5 times.
  for (let i = 0; i < 3; i++) {
    await runTestSuite(i + 1)
  }
}

main()
