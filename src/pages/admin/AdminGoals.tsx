import { IconButton, MenuItem, Snackbar, Tab, Tabs, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import "../../assets/css/AdminGoals.css"
import GoalsTable from '../../component/admin/GoalsTable';
import Axios from '../../axios/config';
import IshowGoal from '../../utils/Interfaces/IGoals';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AssignGoals from '../../component/admin/AssignGoals';
let permanaentGoalList:IshowGoal[] =[];
const AdminGoals = () => {
    const [open, setOpen] = React.useState({open:false,message:""});
    const closeSnackbar = () => setOpen({open:false,message:""});
    const openSnackBar = (message:string) =>setOpen({open:true,message:message});
    const [tabValue,setTabValue] =React.useState("all");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
      };
      const [filterValue,setFilterValue] = React.useState<string>("all");
      
    const [ goalList,setGoalList] = React.useState<IshowGoal[]>([]);

    const loadData = ()=>{
      Axios.get("/goal/getGoals").then((response)=>{
        setGoalList(response.data);
        permanaentGoalList = response.data;
        console.log(permanaentGoalList);
        }).catch((error)=>{
            openSnackBar(error.message);
        });
    }

useEffect(()=>{
loadData();
},[])

useEffect(()=>{
  console.log("permannentList",permanaentGoalList)
  if(filterValue=="pending"){
    const newList = permanaentGoalList.filter((goal)=>{return goal.status=="pending"})
    console.log("permannentList",permanaentGoalList)
    setGoalList(newList);
  }else if(filterValue=="complete"){
    const newList = permanaentGoalList.filter((goal)=>{return goal.status=="complete"})
    setGoalList(newList);
  }else if(filterValue=="progress"){
    const newList = permanaentGoalList.filter((goal)=>{return goal.status=="in-progress"})
    setGoalList(newList);
  }else{
    setGoalList(permanaentGoalList);
  }
},[filterValue,goalList]);



  return (<>
    <div className="page-header">
    <div
      className="page-title"
      style={{ display: "flex", justifyContent: "space-between" }}
      >
      <span>Goals</span>
    </div>
  </div>
  <div className="page-content">
    <div className='tabs-container'>
            <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
            >
            <Tab value="all" label="All Goals" />
            <Tab value="manager" label="Assign Goals" />
          </Tabs>
         {tabValue=="all"&&  <div className="filter-container">
            <TextField fullWidth={true} variant='filled'  select={true} value={filterValue} onChange={(event)=>{setFilterValue(event.target.value)}}> 
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="progress">In-Progress</MenuItem>
            <MenuItem value="complete">Completed</MenuItem>
            </TextField>
          </div>}
    </div>
    {tabValue=="all" ? <GoalsTable goalList={goalList} setGoalList={setGoalList} openSnackBar={openSnackBar} />:<AssignGoals loadData={loadData} openSnackBar={openSnackBar} />}

    </div>
    <Snackbar
        anchorOrigin={{ horizontal:'left',vertical: 'bottom' }}
        sx={{maxWidth: "250px"}}
        open={open.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        message={open.message}
        action={<>
          <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={closeSnackbar}
          >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
          </>
        }
      />
    
        </>
  )
}

export default AdminGoals