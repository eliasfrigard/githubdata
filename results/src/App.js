import React from "react"
import { Bar, Scatter } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import results from "./results.json"

const restResponses = []
const restCpus = []
const restMemories = []
const restFields = [102, 19, 11, 64, 19, 11, 4, 102, 102, 102, 4, 120, 19, 11, 102]
const restTimes = [
  2463100, 5304344, 5616414, 3508231, 4394593, 2385327, 3682049, 1700285, 2974776, 3709755, 5230218, 3066546,
  2111629, 2934477,
]

for (const result of Object.keys(results.restResults)) {
  restResponses.push(results.restResults[result].response)
  restCpus.push(results.restResults[result].cpu)
  restMemories.push(results.restResults[result].memory)
}

const graphResponses = []
const graphCpus = []
const graphMemories = []
const graphFields = [1, 2, 1, 2, 0, 3, 1, 2, 1, 1, 0, 2, 4, 1, 102]
const graphTimes = [
  1500679, 5938014, 9765070, 3515330, 2952684, 3660056, 6368455, 1231236, 3390929, 2434455, 5472390, 2064477,
  3777717, 4700072,
]

for (const result of Object.keys(results.restResults)) {
  graphResponses.push(results.graphResults[result].response)
  graphCpus.push(results.graphResults[result].cpu)
  graphMemories.push(results.graphResults[result].memory)
}

const totalMeasurementIterations = [
  50000, 371250, 1209750, 50000, 87500, 350000, 787500, 37500, 500000, 70000, 75000, 200000, 400000, 650000,
]

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

console.log(graphResponses)

// console.log(mean(restResponses))

export const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        font: {
          size: 28,
        },
        callback: function (value, index, ticks) {
          return value / 1000 + "K"
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 28,
          weight: "bold",
        },
      },
    },
  },
  plugins: {
    // Change options for ALL labels of THIS CHART
    // datalabels: {
    //   color: '#000000',
    //   offset: 8,
    //   align: 'end',
    //   anchor: 'end',
    //   font: {
    //     size: 22,
    //     weight: 700,
    //   },
    //   formatter: function (value, context) {
    //     if (value % 1 === 0) return value

    //     return '~' + value.toFixed(0)
    //   },
    // },
    legend: {
      labels: {
        font: {
          size: 28,
          weight: "bold",
        },
      },
      position: "top",
      display: true,
    },
    title: {
      display: true,
      fontSize: 40,
      // text: 'GraphQL vs REST Response Time',
    },
  },
}

const labels = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14"]

export const cpuData = {
  labels,
  datasets: [
    {
      label: "REST",
      data: restCpus,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "GraphQL",
      data: graphCpus,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

export const memoryData = {
  labels,
  datasets: [
    {
      label: "REST",
      data: restMemories,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "GraphQL",
      data: graphMemories,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

export const responseData = {
  labels,
  datasets: [
    {
      label: "REST",
      data: restResponses,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "GraphQL",
      data: graphResponses,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

export const fieldComparison = {
  labels: [...labels, "Q15"],
  datasets: [
    {
      label: "REST",
      data: restFields,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "GraphQL",
      data: graphFields,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

export const totalTimes = {
  labels: labels,
  datasets: [
    {
      label: "REST",
      data: restTimes,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "GraphQL",
      data: graphTimes,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

export const totalMeasurements = {
  labels: labels,
  datasets: [
    {
      label: "REST",
      data: totalMeasurementIterations,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "GraphQL",
      data: totalMeasurementIterations,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

export const overFetchingResponse = {
  labels: ["Response Time Q1"],
  datasets: [
    {
      label: "REST",
      data: [results.restResults.Q1.response],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "GraphQL",
      data: [results.graphResults.Q1.response],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "GraphQL Over-Fetching",
      data: [results.overFetching.response],
      backgroundColor: "rgba(255, 0, 0, 0.5)",
    },
  ],
}

export const overFetchingMemory = {
  labels: ["Memory Consumption Q1"],
  datasets: [
    {
      label: "REST",
      data: [results.restResults.Q1.memory],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "GraphQL",
      data: [results.graphResults.Q1.memory],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "GraphQL Over-Fetching",
      data: [results.overFetching.memory],
      backgroundColor: "rgba(255, 0, 0, 0.5)",
    },
  ],
}

export const overFetchingCpu = {
  labels: ["CPU Consumption Q1"],
  datasets: [
    {
      label: "REST",
      data: [results.restResults.Q1.cpu],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "GraphQL",
      data: [results.graphResults.Q1.cpu],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "GraphQL Over-Fetching",
      data: [results.overFetching.cpu],
      backgroundColor: "rgba(255, 0, 0, 0.5)",
    },
  ],
}

const restData = [
  { x: restResponses[0], y: restFields[0] },
  { x: restResponses[1], y: restFields[1] },
  { x: restResponses[2], y: restFields[2] },
  { x: restResponses[3], y: restFields[3] },
  { x: restResponses[4], y: restFields[4] },
  { x: restResponses[5], y: restFields[5] },
  { x: restResponses[6], y: restFields[6] },
  { x: restResponses[7], y: restFields[7] },
  { x: restResponses[8], y: restFields[8] },
  { x: restResponses[9], y: restFields[9] },
  { x: restResponses[10], y: restFields[10] },
  { x: restResponses[11], y: restFields[11] },
  { x: restResponses[12], y: restFields[12] },
  { x: restResponses[13], y: restFields[13] },
]

const graphData = [
  { x: graphResponses[0], y: graphFields[0] },
  { x: graphResponses[1], y: graphFields[1] },
  { x: graphResponses[2], y: graphFields[2] },
  { x: graphResponses[3], y: graphFields[3] },
  { x: graphResponses[4], y: graphFields[4] },
  { x: graphResponses[5], y: graphFields[5] },
  { x: graphResponses[6], y: graphFields[6] },
  { x: graphResponses[7], y: graphFields[7] },
  { x: graphResponses[8], y: graphFields[8] },
  { x: graphResponses[9], y: graphFields[9] },
  { x: graphResponses[10], y: graphFields[10] },
  { x: graphResponses[11], y: graphFields[11] },
  { x: graphResponses[12], y: graphFields[12] },
  { x: graphResponses[13], y: graphFields[13] },
]

export const responseScatter = {
  labels: ["Fields / Reponse Time"],
  datasets: [
    {
      label: "REST",
      data: restData,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "GraphQL",
      data: graphData,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "scatter",
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    xaxis: {
      tickAmount: 10,
      labels: {
        formatter: function (val) {
          return parseFloat(val).toFixed(1)
        },
      },
    },
    yaxis: {
      tickAmount: 7,
    },
  },
}

export default function App() {
  return (
    <>
      <div className="chart">
        <h1>CPU Consumption</h1>
        <Bar className="bar" options={options} data={cpuData} />
      </div>

      <div class="break"></div>

      <div className="chart">
        <h1>Memory Consumption</h1>
        <Bar options={options} data={memoryData} />
      </div>

      <div class="break"></div>

      <div className="chart">
        <h1>Response Time</h1>
        <Bar options={options} data={responseData} />
      </div>

      <div class="break"></div>

      <div className="chart">
        <h1>Over Fetching - Reponse Time</h1>
        <Bar options={options} data={overFetchingResponse} />
      </div>

      <div class="break"></div>

      <div className="chart">
        <h1>Over Fetching - Memory Consumption</h1>
        <Bar options={options} data={overFetchingMemory} />
      </div>

      <div class="break"></div>

      <div className="chart">
        <h1>Over Fetching - CPU Consumption</h1>
        <Bar options={options} data={overFetchingCpu} />
      </div>
      <div class="break"></div>

      <div className="chart">
        <h1>Field Comparison</h1>
        <Bar options={options} data={fieldComparison} />
      </div>
      <div class="break"></div>

      <div className="chart">
        <h1>Total Execution Times</h1>
        <Bar options={options} data={totalTimes} />
      </div>
      <div class="break"></div>

      <div className="chart">
        <h1>Total Measurements</h1>
        <Bar options={options} data={totalMeasurements} />
      </div>
      <div class="break"></div>
    </>
  )
}
