import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import { Chart } from 'chart.js'
export default function Linechart({chartdata}) {
  return (
    <div style={{width:550}}>
    <Line data={chartdata}/>
    </div>
  )
}
