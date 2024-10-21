import { Paper,} from '@mui/material'
import React, { useEffect } from 'react'
import PieChart from '../../component/charts/PieChart'
import AverageScoreRadialBar from '../../component/charts/AverageScoreRadialbar'
import GoalsChart from '../../component/charts/GoalsChart'
import Axios from '../../axios/config'
import { IchartData, IgoalChartResponse, IpieChartData } from '../../utils/Interfaces/IChart';
import ContentHeader from '../../component/common/ContentHeader'

const AdminDashboard:React.FC = () => {
  const [radialBarData,setRadialBarData] =  React.useState(0);
  const[goalChartData, setGoalChartData] = React.useState<IchartData[]>([]);
  const [pieChartData, setpieChartData] = React.useState<IpieChartData>({
    labels:[],
    series:[]
});
  
  useEffect(()=>{

    Axios.get("/performance/averagePerformance/").then((response)=>{
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
    Axios.get("/user/employeePieChart").then((chartData)=>{
      let names:string[] = [];
      let quantities:number[] = [];

      chartData.data.forEach((data : {employeeRole:string,totalEmployee:number})=>{
          names.push(data.employeeRole);
          quantities.push(data.totalEmployee);
      })
     setpieChartData({
         labels:names,
         series: quantities,
      })
  })
  }

  return (
   <>

      < ContentHeader title='Dashboard' />
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

export default AdminDashboard