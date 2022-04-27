const results = require('./src/results.json')

for (const [key, value] of Object.entries(results.restResults)) {
  console.log(`${value.cpu.toFixed(2).toString().replace('.', ',')}`)
}

for (const [key, value] of Object.entries(results.graphResults)) {
  console.log(`${value.cpu.toFixed(2).toString().replace('.', ',')}`)
}
