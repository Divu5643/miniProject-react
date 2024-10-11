import { Paper } from '@mui/material'
import React, { useEffect } from 'react'
import PieChart from '../../component/charts/PieChart'
import AverageScoreRadialBar from '../../component/charts/AverageScoreRadialbar'
import GoalsChart from '../../component/charts/GoalsChart'
import Axios from '../../axios/config'
import { IchartData, IgoalChartResponse, IpieChartData } from '../../utils/Interfaces/IChart';
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'

const ReviewerDashboard = () => {
  const [radialBarData,setRadialBarData] =  React.useState(0);
  const[goalChartData, setGoalChartData] = React.useState<IchartData[]>([]);
  const [pieChartData, setpieChartData] = React.useState<IpieChartData>({
    labels:[],
    series:[]
});
const userId = useSelector((state:RootState)=>state.loginData.userId);
useEffect(()=>{

  Axios.post("/performance/averagePerformanceByManager",{userID:userId}).then((response)=>{
    console.log(response);
    setRadialBarData(response.data);
  })
  loadGoalChartData(); // call function to load goal chart data after getting average performance data.
  loadPieChartData();
},[])


const loadGoalChartData =()=>{
  Axios.get("/goal/getGoalDataForChart").then((result)=>{
    let series:IchartData[] =[{name:"Pending",data:[]},{name: 'In-Progress',data:[]},{name: 'Completed',data:[]}];
  
    console.log(result.data)
    result.data.forEach((goalData :IgoalChartResponse )=>{
      series.forEach((obj)=>{
        if(obj.name=="Pending"){
          obj.data.push(goalData.pendingGoal);
        }else if(obj.name=="In-Progress"){
          obj.data.push(goalData.progressGoal);
        }else{
          obj.data.push(goalData.completedGoal);
        }
      })
    })
    setGoalChartData(series);
  })
}

const loadPieChartData = ()=>{
  Axios.post("/chart/employeePieChartByManger",{userID:userId}).then((chartData)=>{
    setpieChartData({
       labels:["Employes"],
       series: [chartData.data],
    })
})
}

  return (
    <>
   <div className="page-header">
        <h4 className="page-title">Dashboard</h4>
      </div>

    <div className="page-content">
      <Paper  elevation={6}  >
        <div className="piecharts" style={{display:"flex",justifyContent:"space-around",padding:"20px"}}>
      <PieChart  pieChartdata ={pieChartData}/>
        <AverageScoreRadialBar data={radialBarData} />
        </div>
        <div className="barChart">
          <GoalsChart  chartData={goalChartData}  />
        </div>
      </Paper>
    </div>

   </>
  )
}

export default ReviewerDashboard