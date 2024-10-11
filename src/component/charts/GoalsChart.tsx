
import Chart from "react-apexcharts";

import { IchartData } from '../../utils/Interfaces/IChart';



const GoalsChart = ({chartData}:{chartData:IchartData[]}) => {

 


    let options = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: false,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec'],
        },
        yaxis: {
          title: {
            text: 'goals'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val:string) {
              return "" + val +"Goals"
            }
          }
        }
      };
    
  return (
    <>
     <div className="barchart">
      <div style={{width:"60%", margin:"auto"}}>

    <Chart options={options} series={chartData} type='bar' width="90%"  />
      </div>
  </div>
    
    
    </>
  )
}

export default GoalsChart