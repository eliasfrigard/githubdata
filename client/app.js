import { interceptRequest, interceptResponse } from './queries/utils/interceptors.js'
import { writeFile } from './queries/utils/io-utils.js'
import ProgressBar from './queries/utils/progress-ui.js'

// Warmup script.
import { warmupRest, warmupGraphQL } from './queries/utils/warmup.js'

// Import REST queries.
import rest1 from './queries/REST/rest1.js'
import rest2 from './queries/REST/rest2.js'
import rest3 from './queries/REST/rest3.js'
import rest4 from './queries/REST/rest4.js'
import rest5 from './queries/REST/rest5.js'
import rest6 from './queries/REST/rest6.js'
import rest7 from './queries/REST/rest7.js'
import rest8 from './queries/REST/rest8.js'
import rest9 from './queries/REST/rest9.js'
import rest10 from './queries/REST/rest10.js'
import rest11 from './queries/REST/rest11.js'
import rest12 from './queries/REST/rest12.js'
import rest13 from './queries/REST/rest13.js'
import rest14 from './queries/REST/rest14.js'

// Import GraphQL queries.
import graph1 from './queries/GraphQL/graph1.js'
import graph2 from './queries/GraphQL/graph2.js'
import graph3 from './queries/GraphQL/graph3.js'
import graph4 from './queries/GraphQL/graph4.js'
import graph5 from './queries/GraphQL/graph5.js'
import graph6 from './queries/GraphQL/graph6.js'
import graph7 from './queries/GraphQL/graph7.js'
import graph8 from './queries/GraphQL/graph8.js'
import graph9 from './queries/GraphQL/graph9.js'
import graph10 from './queries/GraphQL/graph10.js'
import graph11 from './queries/GraphQL/graph11.js'
import graph12 from './queries/GraphQL/graph12.js'
import graph13 from './queries/GraphQL/graph13.js'
import graph14 from './queries/GraphQL/graph14.js'

// GraphQL query for testing relative over-fetching performance.
import graph15 from './queries/GraphQL/graph15.js'

async function main() {
  // Use interceptors for performance measurements.
  interceptRequest()
  interceptResponse()

  // Set iteration count varialbes.
  // Equal for both APIs.
  const iterationsQ1 = 10000
  const iterationsQ2 = 250
  const iterationsQ3 = 10
  const iterationsQ4 = 10000
  const iterationsQ5 = 2500
  const iterationsQ6 = 10000
  const iterationsQ7 = 2500
  const iterationsQ8 = 2500
  const iterationsQ9 = 5000
  const iterationsQ10 = 1000
  const iterationsQ11 = 150
  const iterationsQ12 = 5000
  const iterationsQ13 = 10000
  const iterationsQ14 = 5000

  // // Run warmup.
  // await warmupGraphQL()

  // // Run GraphQL queries.
  // await runTestMethod(graph1, iterationsQ1, 'GraphQL', 'Q1')
  // await runTestMethod(graph2, iterationsQ2, 'GraphQL', 'Q2')
  // await runTestMethod(graph3, iterationsQ3, 'GraphQL', 'Q3')
  // await runTestMethod(graph4, iterationsQ4, 'GraphQL', 'Q4')
  // await runTestMethod(graph5, iterationsQ5, 'GraphQL', 'Q5')
  // await runTestMethod(graph6, iterationsQ6, 'GraphQL', 'Q6')
  // await runTestMethod(graph7, iterationsQ7, 'GraphQL', 'Q7')
  // await runTestMethod(graph8, iterationsQ8, 'GraphQL', 'Q8')
  // await runTestMethod(graph9, iterationsQ9, 'GraphQL', 'Q9')
  // await runTestMethod(graph10, iterationsQ10, 'GraphQL', 'Q10')
  // await runTestMethod(graph11, iterationsQ11, 'GraphQL', 'Q11')
  // await runTestMethod(graph12, iterationsQ12, 'GraphQL', 'Q12')
  // await runTestMethod(graph13, iterationsQ13, 'GraphQL', 'Q13')
  // await runTestMethod(graph14, iterationsQ14, 'GraphQL', 'Q14')

  // // Run warmup.
  // await warmupRest()

  // // Run REST queries.
  // await runTestMethod(rest1, iterationsQ1, 'REST', 'Q1')
  // await runTestMethod(rest2, iterationsQ2, 'REST', 'Q2')
  // await runTestMethod(rest3, iterationsQ3, 'REST', 'Q3')
  // await runTestMethod(rest4, iterationsQ4, 'REST', 'Q4')
  // await runTestMethod(rest5, iterationsQ5, 'REST', 'Q5')
  // await runTestMethod(rest6, iterationsQ6, 'REST', 'Q6')
  // await runTestMethod(rest7, iterationsQ7, 'REST', 'Q7')
  // await runTestMethod(rest8, iterationsQ8, 'REST', 'Q8')
  // await runTestMethod(rest9, iterationsQ9, 'REST', 'Q9')
  // await runTestMethod(rest10, iterationsQ10, 'REST', 'Q10')
  // await runTestMethod(rest11, iterationsQ11, 'REST', 'Q11')
  // await runTestMethod(rest12, iterationsQ12, 'REST', 'Q12')
  // await runTestMethod(rest13, iterationsQ13, 'REST', 'Q13')
  // await runTestMethod(rest14, iterationsQ14, 'REST', 'Q14')

  // Test over-fetching.
  for (let index = 0; index < 10; index++) {
    // Run warmup.
    await warmupGraphQL()

    // Run tests.
    await runTestMethod(graph15, iterationsQ1, 'GraphQL', 'Q15', index + 1)
  }
}

const runTestMethod = async (method, iterations, api, query, testSuiteNumber) => {
  console.log('')
  console.log(`============ Running Tests for ${api} ${query} ============`)
  console.log('')

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

main()
