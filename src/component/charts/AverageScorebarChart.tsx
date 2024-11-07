import React from 'react'
import { IperfomanceBarChartData, numberToMonth } from '../../utils/Interfaces/IChart';
import Chart from "react-apexcharts";
const AverageScorebarChart = ({chartData} : {chartData:IperfomanceBarChartData[]}) => {
    let categories =  chartData.map((data:IperfomanceBarChartData)=>{
        return numberToMonth[data.month]
    })
    const [data,setData] = React.useState()
    let series = chartData.map((data:IperfomanceBarChartData)=>{   
        return data.averageScore;});

        let options = {
        chart: {
          type: "bar",
          width: "100%",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "Average Score",
          align: "center",
          style: {
            fontWeight: "bold",
            fontSize: "16px",
          },
        },
        stroke: {
          show: false,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: categories,
        },
        yaxis: {
          title: {
            text: "Marks",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val: string) {
              return "" + val + " marks";
            },
          },
        },
      };


  return (
    <>
    <Chart options={options} series={  [{name:"",
    data:series}]} type="bar" width="90%" />
  </>
  )
}

export default AverageScorebarChart