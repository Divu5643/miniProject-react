import React from 'react'
import Chart from "react-apexcharts";
const ReporteeRaidalBar = ({pieChartdata}:{pieChartdata:any}) => {
   const  options = {
    chart: {
    type: 'radialBar',
    offsetY: -20,
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: '97%',
        margin: 5, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: '#999',
          opacity: 1,
          blur: 2
        }
      },
      dataLabels: {
        name: {
          fontSize: '16px',
          color: undefined,
          offsetY: 100
        },
        value: {
            offsetY: 50,
            fontSize: '22px',
            color: undefined,
            formatter: function (val) {
              return val + " Employees";
            }
          }
      }
    }
  },
  grid: {
    padding: {
      top: -10
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91]
    },
  },
  labels: ['Employee Count'],
  };



  return (
    <>
    <div className="hello">

    <Chart options={options} series={[30]} type='radialBar'  width={"300px"} />
    </div>
    </>
  )
}

export default ReporteeRaidalBar