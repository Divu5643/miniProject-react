import { Paper,} from '@mui/material'
import React, { useEffect } from 'react'
import PieChart from '../../component/charts/PieChart'
import AverageScoreRadialBar from '../../component/charts/AverageScoreRadialbar'
import GoalsChart from '../../component/charts/GoalsChart'
import Axios from '../../axios/config'
import { IchartData, IgoalChartResponse, IperfomanceBarChartData, IpieChartData } from '../../utils/Interfaces/IChart';
import { useDispatch } from 'react-redux'
import { setTitle } from '../../redux/slice/userSlice'
import AverageScorebarChart from '../../component/charts/AverageScorebarChart'

const AdminDashboard:React.FC = () => {
  const dispatch = useDispatch();
  const [radialBarData,setRadialBarData] =  React.useState(0);
  const[goalChartData, setGoalChartData] = React.useState<IchartData[]>([]);
  const [pieChartData, setpieChartData] = React.useState<IpieChartData>({
    labels:[],
    series:[]
});
const [perfomanceChartData, setPerfomanceChartData] = React.useState<IperfomanceBarChartData[]>([]);
  
  useEffect(()=>{
    dispatch(setTitle("Dashboard"));
    Axios.get("/performance/averagePerformance/").then((response)=>{
      setRadialBarData(response.data);
    })
    loadGoalChartData(); // call function to load goal chart data after getting average performance data.
    loadPieChartData();
    loadPerfomanceChartData();
  },[])


  const loadGoalChartData =()=>{
    Axios.get("/goal/getGoalDataForChart").then((result)=>{
      let series:IchartData[] =[{name:"Pending",data:[]},{name: 'In-Progress',data:[]},{name: 'Completed',data:[]}];
    
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
  const loadPerfomanceChartData =()=>{
    Axios.get("performance/getBarChartData").then((response)=>{

      setPerfomanceChartData(response.data);
    })
  }

  return (
   <>

      {/* < ContentHeader title='Dashboard' /> */}
    <div className="page-content">
      <Paper  elevation={6} sx={{padding:"1rem"}} >
        <div className="piecharts" style={{display:"flex",justifyContent:"space-around",padding:"20px"}}>
          <Paper elevation={4}>
      <PieChart name="Employee Chart"  pieChartdata ={pieChartData}/>
          </Paper>
          <Paper elevation={4}>

        <AverageScoreRadialBar data={radialBarData} />
          </Paper>
        </div>
        <div className="chart-container">
        <div className="barChart">
        <Paper elevation={4}>
          <GoalsChart  chartData={goalChartData}  />
        </Paper>
        </div>
        <div className="barChart">
        <Paper elevation={4}>
          <AverageScorebarChart  chartData={perfomanceChartData}  />
        </Paper>
        </div>
        </div>
      </Paper>
    </div>
    

   </>
  )
}

export default AdminDashboard