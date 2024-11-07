import { Paper } from '@mui/material'
import React, { useEffect } from 'react'
import PieChart from '../../component/charts/PieChart'
import AverageScoreRadialBar from '../../component/charts/AverageScoreRadialbar'
import GoalsChart from '../../component/charts/GoalsChart'
import Axios from '../../axios/config'
import { IchartData, IgoalChartResponse, IpieChartData } from '../../utils/Interfaces/IChart';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import CommonSnackbar from '../../component/common/CommonSnackbar'

import { setTitle } from '../../redux/slice/userSlice'
import ReporteeRaidalBar from '../../component/charts/ReporteeRaidalBar'

const ReviewerDashboard:React.FC = () => {
  const dispatch = useDispatch();
  const [radialBarData,setRadialBarData] =  React.useState(0);
  const[goalChartData, setGoalChartData] = React.useState<IchartData[]>([]);
  // Snackbar
  const [open, setOpen] = React.useState({open:false,message:""});
  const closeSnackbar = () => setOpen({open:false,message:""});
  const openSnackBar = (message:string) =>{console.log("opened snackbar");setOpen({open:true,message:message});}
  // snackbar
  const [pieChartData, setpieChartData] = React.useState<IpieChartData>({
    labels:[],
    series:[]
});
const userId = useSelector((state:RootState)=>state.loginData.userId);
useEffect(()=>{
  dispatch(setTitle("Dashboard"));
    Axios.post("/performance/averagePerformanceByManager",{userID:userId}).then((response)=>{
      
      setRadialBarData(response.data);
    })
    loadGoalChartData(); // call function to load goal chart data after getting average performance data.
    loadPieChartData();
  

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
  }).catch((err)=>openSnackBar(err.message))
}

const loadPieChartData = ()=>{
  Axios.post("/user/employeePieChartByManger",{userID:userId}).then((chartData)=>{
    setpieChartData({
       labels:["Employes"],
       series: [chartData.data],
    })
})
}

  return (
    <>
      {/* < ContentHeader title='Dashboard' /> */}

    <div className="page-content">
      <Paper  elevation={6} sx={{padding:"1rem"}}  >
        <div className="piecharts" style={{display:"flex",justifyContent:"space-around",padding:"20px"}}>
        <Paper elevation={4}>
      <PieChart  pieChartdata ={pieChartData} name={'Reportee Count'}/>
      {/* <ReporteeRaidalBar pieChartdata ={pieChartData} /> */}
      </ Paper>
      <Paper elevation={4}>

        <AverageScoreRadialBar data={radialBarData} />
      </Paper>
        </div>
        <div className="barChart">
        <Paper elevation={4}>
          <GoalsChart  chartData={goalChartData}  />
        </Paper>
        </div>
      </Paper>
    </div>
    <CommonSnackbar open={open} closeSnackbar ={closeSnackbar} />
   </>
  )
}

export default ReviewerDashboard