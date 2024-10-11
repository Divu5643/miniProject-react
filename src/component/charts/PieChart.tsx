
import React, { useEffect } from 'react'
import Chart from "react-apexcharts";

import { IpieChartData } from '../../utils/Interfaces/IChart';

const employeePieChart = ({pieChartdata}:{pieChartdata:IpieChartData}) => {
   
    const total = pieChartdata.series.reduce((acc,value)=>acc+value,0)
    const options = {
        labels:pieChartdata.labels,
        plotOptions:{
            pie:{
                donut:{
                    size:"70%",
                    labels:{
                        show:true,
                        total:{
                            show: true,
                            label:"Total Employee",
                            formatter:()=>total
                        }
                    }
                }
            },
        },
        
        title:{
            text:"Employe Pie Chart",
            align: 'center',
            style:{
                fontWeight: 'bold',
            fontSize: '16px'
            },
        },
        legend:{
            position:"bottom",
            HorizontalAlign:'center',
            fontSize: '14px',    
        }
      };
  return (
    <>
    {/* <Paper elevation={8} > */}
    <div className="donut">
    <Chart options={options} series={pieChartdata.series} type='donut' width="350px" />
  </div>
    {/* </Paper> */}
    </>
  )
}

export default employeePieChart