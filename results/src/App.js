import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import results from './results.json'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'GraphQL vs REST Response Time',
    },
  },
  options: {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  },
}

const labels = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12', 'Q13', 'Q14']

export const cpuData = {
  labels,
  datasets: [
    {
      label: 'REST',
      data: [
        results.restResults.Q1.cpu,
        results.restResults.Q2.cpu,
        results.restResults.Q3.cpu,
        results.restResults.Q4.cpu,
        results.restResults.Q5.cpu,
        results.restResults.Q6.cpu,
        results.restResults.Q7.cpu,
        results.restResults.Q8.cpu,
        results.restResults.Q9.cpu,
        results.restResults.Q10.cpu,
        results.restResults.Q11.cpu,
        results.restResults.Q12.cpu,
        results.restResults.Q13.cpu,
        results.restResults.Q14.cpu,
      ],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'GraphQL',
      data: [
        results.graphResults.Q1.cpu,
        results.graphResults.Q2.cpu,
        results.graphResults.Q3.cpu,
        results.graphResults.Q4.cpu,
        results.graphResults.Q5.cpu,
        results.graphResults.Q6.cpu,
        results.graphResults.Q7.cpu,
        results.graphResults.Q8.cpu,
        results.graphResults.Q9.cpu,
        results.graphResults.Q10.cpu,
        results.graphResults.Q11.cpu,
        results.graphResults.Q12.cpu,
        results.graphResults.Q13.cpu,
        results.graphResults.Q14.cpu,
      ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

export const memoryData = {
  labels,
  datasets: [
    {
      label: 'REST',
      data: [
        results.restResults.Q1.memory,
        results.restResults.Q2.memory,
        results.restResults.Q3.memory,
        results.restResults.Q4.memory,
        results.restResults.Q5.memory,
        results.restResults.Q6.memory,
        results.restResults.Q7.memory,
        results.restResults.Q8.memory,
        results.restResults.Q9.memory,
        results.restResults.Q10.memory,
        results.restResults.Q11.memory,
        results.restResults.Q12.memory,
        results.restResults.Q13.memory,
        results.restResults.Q14.memory,
      ],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'GraphQL',
      data: [
        results.graphResults.Q1.memory,
        results.graphResults.Q2.memory,
        results.graphResults.Q3.memory,
        results.graphResults.Q4.memory,
        results.graphResults.Q5.memory,
        results.graphResults.Q6.memory,
        results.graphResults.Q7.memory,
        results.graphResults.Q8.memory,
        results.graphResults.Q9.memory,
        results.graphResults.Q10.memory,
        results.graphResults.Q11.memory,
        results.graphResults.Q12.memory,
        results.graphResults.Q13.memory,
        results.graphResults.Q14.memory,
      ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

export const responseData = {
  labels,
  datasets: [
    {
      label: 'REST',
      data: [
        results.restResults.Q1.response,
        results.restResults.Q2.response,
        results.restResults.Q3.response,
        results.restResults.Q4.response,
        results.restResults.Q5.response,
        results.restResults.Q6.response,
        results.restResults.Q7.response,
        results.restResults.Q8.response,
        results.restResults.Q9.response,
        results.restResults.Q10.response,
        results.restResults.Q11.response,
        results.restResults.Q12.response,
        results.restResults.Q13.response,
        results.restResults.Q14.response,
      ],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'GraphQL',
      data: [
        results.graphResults.Q1.response,
        results.graphResults.Q2.response,
        results.graphResults.Q3.response,
        results.graphResults.Q4.response,
        results.graphResults.Q5.response,
        results.graphResults.Q6.response,
        results.graphResults.Q7.response,
        results.graphResults.Q8.response,
        results.graphResults.Q9.response,
        results.graphResults.Q10.response,
        results.graphResults.Q11.response,
        results.graphResults.Q12.response,
        results.graphResults.Q13.response,
        results.graphResults.Q14.response,
      ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

export default function App() {
  return (
    <div class='chart-container'>
      <div className='chart'>
        <h1>CPU Consumption</h1>
        <Bar options={options} data={cpuData} />
      </div>

      <div class='break'></div>

      <div className='chart'>
        <h1>Memory Consumption</h1>
        <Bar options={options} data={memoryData} />
      </div>

      <div class='break'></div>

      <div className='chart'>
        <h1>Response Time</h1>
        <Bar options={options} data={responseData} />
      </div>
    </div>
  )
}
