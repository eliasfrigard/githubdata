import { readDirectory, readFile, writeFile } from './queries/utils/io-utils.js'

const testSuiteResults = async (directory) => {
  const rest1results = await getFileData(directory + '/REST/Q1/')
  const rest2results = await getFileData(directory + '/REST/Q2/')
  const rest3results = await getFileData(directory + '/REST/Q3/')
  const rest4results = await getFileData(directory + '/REST/Q4/')
  const rest5results = await calculateUnderFetchedData(directory + '/REST/Q5/', 5)
  const rest6results = await getFileData(directory + '/REST/Q6/')
  const rest7results = await getFileData(directory + '/REST/Q7/')
  const rest8results = await getFileData(directory + '/REST/Q8/')
  const rest9results = await getFileData(directory + '/REST/Q9/')
  const rest10results = await getFileData(directory + '/REST/Q10/')
  const rest11results = await getFileData(directory + '/REST/Q11/')
  const rest12results = await calculateUnderFetchedData(directory + '/REST/Q12/', 3)
  const rest13results = await getFileData(directory + '/REST/Q13/')
  const rest14results = await getFileData(directory + '/REST/Q14/')

  const graph1results = await getFileData(directory + '/GraphQL/Q1/')
  const graph2results = await getFileData(directory + '/GraphQL/Q2/')
  const graph3results = await getFileData(directory + '/GraphQL/Q3/')
  const graph4results = await getFileData(directory + '/GraphQL/Q4/')
  const graph5results = await getFileData(directory + '/GraphQL/Q5/')
  const graph6results = await getFileData(directory + '/GraphQL/Q6/')
  const graph7results = await getFileData(directory + '/GraphQL/Q7/')
  const graph8results = await getFileData(directory + '/GraphQL/Q8/')
  const graph9results = await getFileData(directory + '/GraphQL/Q9/')
  const graph10results = await getFileData(directory + '/GraphQL/Q10/')
  const graph11results = await getFileData(directory + '/GraphQL/Q11/')
  const graph12results = await getFileData(directory + '/GraphQL/Q12/')
  const graph13results = await getFileData(directory + '/GraphQL/Q13/')
  const graph14results = await getFileData(directory + '/GraphQL/Q14/')

  const results = {
    restResults: {
      Q1: rest1results,
      Q2: rest2results,
      Q3: rest3results,
      Q4: rest4results,
      Q5: rest5results,
      Q6: rest6results,
      Q7: rest7results,
      Q8: rest8results,
      Q9: rest9results,
      Q10: rest10results,
      Q11: rest11results,
      Q12: rest12results,
      Q13: rest13results,
      Q14: rest14results,
    },
    graphResults: {
      Q1: graph1results,
      Q2: graph2results,
      Q3: graph3results,
      Q4: graph4results,
      Q5: graph5results,
      Q6: graph6results,
      Q7: graph7results,
      Q8: graph8results,
      Q9: graph9results,
      Q10: graph10results,
      Q11: graph11results,
      Q12: graph12results,
      Q13: graph13results,
      Q14: graph14results,
    },
  }

  return results
}

const getFileData = async (directory) => {
  const dirFiles = readDirectory(directory)

  let cpu = 0
  let memory = 0
  let response = 0
  let iterations = 0

  for (const file of dirFiles) {
    if (!file.includes('.json')) continue

    // Read file data.
    const data = await readFile(directory + file)

    iterations += data.length

    // Sum all values
    data.forEach((element) => {
      cpu += parseInt(element.cpu)
      memory += parseFloat(element.memory)
      response += parseInt(element.response)
    })
  }

  const results = {
    cpu: Math.round((cpu / iterations) * 1000),
    memory: memory / iterations,
    response: response / iterations,
    iterations: iterations,
    totalTime: response,
    directory: directory,
  }

  return results
}

const flattenArray = (array) => {
  const newArray = []

  for (const element of array) {
    newArray.push(...element)
  }

  return newArray
}

const calculateUnderFetchedData = async (directory, requestCount) => {
  const dirFiles = readDirectory(directory)

  let cpu = 0
  let memory = 0
  let response = 0
  let iterations = 0

  for (const file of dirFiles) {
    if (!file.includes('.json')) continue

    // Read file data.
    let data = await readFile(directory + file)

    // Flatten data array.
    data = flattenArray(data)

    iterations += data.length / requestCount

    // Sum all values
    data.forEach((element) => {
      cpu += parseInt(element.cpu)
      memory += parseFloat(element.memory)
      response += parseInt(element.response)
    })
  }

  const results = {
    cpu: Math.round((cpu / iterations) * 1000),
    memory: memory / iterations,
    response: response / iterations,
    iterations: iterations,
    totalTime: response,
    directory: directory,
  }

  return results
}

const reduceQueryResults = (objectArray) => {
  let cpu = 0
  let memory = 0
  let response = 0
  let iterations = 0
  let totalTime = 0

  for (let i = 0; i < objectArray.length; i++) {
    const object = objectArray[i]

    cpu += object.cpu
    memory += object.memory
    response += object.response
    iterations += object.iterations
    totalTime += object.totalTime
  }

  const results = {
    cpu: cpu / objectArray.length,
    memory: memory / objectArray.length,
    response: response / objectArray.length,
    iterations: iterations,
    totalTime: totalTime,
  }

  return results
}

const combineFiles = (filesArray) => {
  const q1rest = []
  const q2rest = []
  const q3rest = []
  const q4rest = []
  const q5rest = []
  const q6rest = []
  const q7rest = []
  const q8rest = []
  const q9rest = []
  const q10rest = []
  const q11rest = []
  const q12rest = []
  const q13rest = []
  const q14rest = []
  const q1graph = []
  const q2graph = []
  const q3graph = []
  const q4graph = []
  const q5graph = []
  const q6graph = []
  const q7graph = []
  const q8graph = []
  const q9graph = []
  const q10graph = []
  const q11graph = []
  const q12graph = []
  const q13graph = []
  const q14graph = []

  // Add all iterations of queries to arrays.
  for (let i = 0; i < filesArray.length; i++) {
    q1rest.push(filesArray[i].restResults.Q1)
    q2rest.push(filesArray[i].restResults.Q2)
    q3rest.push(filesArray[i].restResults.Q3)
    q4rest.push(filesArray[i].restResults.Q4)
    q5rest.push(filesArray[i].restResults.Q5)
    q6rest.push(filesArray[i].restResults.Q6)
    q7rest.push(filesArray[i].restResults.Q7)
    q8rest.push(filesArray[i].restResults.Q8)
    q9rest.push(filesArray[i].restResults.Q9)
    q10rest.push(filesArray[i].restResults.Q10)
    q11rest.push(filesArray[i].restResults.Q11)
    q12rest.push(filesArray[i].restResults.Q12)
    q13rest.push(filesArray[i].restResults.Q13)
    q14rest.push(filesArray[i].restResults.Q14)
    q1graph.push(filesArray[i].graphResults.Q1)
    q2graph.push(filesArray[i].graphResults.Q2)
    q3graph.push(filesArray[i].graphResults.Q3)
    q4graph.push(filesArray[i].graphResults.Q4)
    q5graph.push(filesArray[i].graphResults.Q5)
    q6graph.push(filesArray[i].graphResults.Q6)
    q7graph.push(filesArray[i].graphResults.Q7)
    q8graph.push(filesArray[i].graphResults.Q8)
    q9graph.push(filesArray[i].graphResults.Q9)
    q10graph.push(filesArray[i].graphResults.Q10)
    q11graph.push(filesArray[i].graphResults.Q11)
    q12graph.push(filesArray[i].graphResults.Q12)
    q13graph.push(filesArray[i].graphResults.Q13)
    q14graph.push(filesArray[i].graphResults.Q14)
  }

  // Calculate average for each query.
  const q1restResults = reduceQueryResults(q1rest)
  const q2restResults = reduceQueryResults(q2rest)
  const q3restResults = reduceQueryResults(q3rest)
  const q4restResults = reduceQueryResults(q4rest)
  const q5restResults = reduceQueryResults(q5rest)
  const q6restResults = reduceQueryResults(q6rest)
  const q7restResults = reduceQueryResults(q7rest)
  const q8restResults = reduceQueryResults(q8rest)
  const q9restResults = reduceQueryResults(q9rest)
  const q10restResults = reduceQueryResults(q10rest)
  const q11restResults = reduceQueryResults(q11rest)
  const q12restResults = reduceQueryResults(q12rest)
  const q13restResults = reduceQueryResults(q13rest)
  const q14restResults = reduceQueryResults(q14rest)

  const q1graphResults = reduceQueryResults(q1graph)
  const q2graphResults = reduceQueryResults(q2graph)
  const q3graphResults = reduceQueryResults(q3graph)
  const q4graphResults = reduceQueryResults(q4graph)
  const q5graphResults = reduceQueryResults(q5graph)
  const q6graphResults = reduceQueryResults(q6graph)
  const q7graphResults = reduceQueryResults(q7graph)
  const q8graphResults = reduceQueryResults(q8graph)
  const q9graphResults = reduceQueryResults(q9graph)
  const q10graphResults = reduceQueryResults(q10graph)
  const q11graphResults = reduceQueryResults(q11graph)
  const q12graphResults = reduceQueryResults(q12graph)
  const q13graphResults = reduceQueryResults(q13graph)
  const q14graphResults = reduceQueryResults(q14graph)

  // Add all results to object.
  return {
    restResults: {
      Q1: q1restResults,
      Q2: q2restResults,
      Q3: q3restResults,
      Q4: q4restResults,
      Q5: q5restResults,
      Q6: q6restResults,
      Q7: q7restResults,
      Q8: q8restResults,
      Q9: q9restResults,
      Q10: q10restResults,
      Q11: q11restResults,
      Q12: q12restResults,
      Q13: q13restResults,
      Q14: q14restResults,
    },
    graphResults: {
      Q1: q1graphResults,
      Q2: q2graphResults,
      Q3: q3graphResults,
      Q4: q4graphResults,
      Q5: q5graphResults,
      Q6: q6graphResults,
      Q7: q7graphResults,
      Q8: q8graphResults,
      Q9: q9graphResults,
      Q10: q10graphResults,
      Q11: q11graphResults,
      Q12: q12graphResults,
      Q13: q13graphResults,
      Q14: q14graphResults,
    },
  }
}

const main = async () => {
  const test1results = await testSuiteResults('../results/test1')
  const test2results = await testSuiteResults('../results/test2')
  const test3results = await testSuiteResults('../results/test3')
  const test4results = await testSuiteResults('../results/test4')
  const test5results = await testSuiteResults('../results/test5')
  const test6results = await testSuiteResults('../results/test6')
  const test7results = await testSuiteResults('../results/test7')
  const test8results = await testSuiteResults('../results/test8')
  const test9results = await testSuiteResults('../results/test9')
  const test10results = await testSuiteResults('../results/test10')

  const combinedResults = combineFiles([
    test1results,
    test2results,
    test3results,
    test4results,
    test5results,
    test6results,
    test7results,
    test8results,
    test9results,
    test10results,
  ])

  await writeFile('../results/src/src/results.json', combinedResults)
}

main()
