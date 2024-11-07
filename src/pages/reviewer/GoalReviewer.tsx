
import {
    MenuItem,
    Tab,
    Tabs,
    TextField,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import "../../assets/css/AdminGoals.css";
  import GoalsTable from "../../component/common/GoalsTable";
  import Axios from "../../axios/config";
  import IshowGoal from "../../utils/Interfaces/IGoals";
  import AssignGoals from "../../component/admin/AssignGoals";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import NoData from "../../component/common/NoData";

import { setTitle } from "../../redux/slice/userSlice";
import CommonSnackbar from "../../component/common/CommonSnackbar";
  let permanaentGoalList: IshowGoal[] = [];
  const  setPermanaentGoalList = (list:IshowGoal[])=>{
    permanaentGoalList = list;
  }

  const GoalReviewer:React.FC = () => {
    const dispatch = useDispatch();
    // For Snackbar
    const [open, setOpen] = React.useState({ open: false, message: "" });
    const closeSnackbar = () => setOpen({ open: false, message: "" });
    const openSnackBar = (message: string) =>
      setOpen({ open: true, message: message });

    // For Tabs
    const [tabValue, setTabValue] = React.useState("all");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setTabValue(newValue);
    };
    // For filter
    const [filterValue, setFilterValue] = React.useState<string>("all");
    // For Goals
    const [totalCount,setTotalCount] = React.useState<number>(0);
    const [filterAndSearch, setFilterAndSearch] = React.useState({
      RowCount: 5,
      PageNumber: 0,
      FilterValue:"all",
      Search: "",
    });

    const [goalList, setGoalList] = React.useState<IshowGoal[]>([]);
    const userId =  useSelector((state:RootState)=>state.loginData.userId);


    useEffect(() => {
      const logData = setTimeout(() => {
        loadData();
      }, 400);
      return () => clearTimeout(logData);
    }, [filterAndSearch]);
  
    const loadData=()=>{
  Axios.post("/goal/getAllGoalsforManager",{...filterAndSearch,managerId:userId}).then((response)=>
    {
      setTotalCount(response.data.total);
      setGoalList(response.data.goals);
    })
    }
  

  
    return (
      <>
        {/* < ContentHeader title='Goals' /> */}
        <div className="page-content"  >
          <div className="tabs">
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab value="all" label="All Goals" />
              <Tab value="manager" label="Assign Goals" />
            </Tabs>
            {tabValue == "all" && (<>
               <div className="SearchContainer filter-container" >
               {/* <GoalSearch isGoal={true} permanentList={permanaentGoalList}  setGoalList={setGoalList} /> */}
             </div>
              <div className="filter-container">
                <TextField
                  fullWidth={true}
                  variant="standard"
                  select={true}
                  value={filterValue}
                  onChange={(event) => {
                    setFilterValue(event.target.value);
                  }}
                  >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="progress">In-Progress</MenuItem>
                  <MenuItem value="complete">Complete</MenuItem>
                </TextField>
              </div>
                  </>
            )}
          </div>
          {tabValue == "all" ? (
            goalList.length == 0 ?(<><NoData /></>): (<GoalsTable
            goalList={goalList}
            setGoalList={setGoalList}
            openSnackBar={openSnackBar}
            permanaentGoalList ={permanaentGoalList}
             setPermanaentGoalList = {setPermanaentGoalList}
            totalCount={totalCount}
            filterAndSearch={filterAndSearch}
            setFilterAndSearch={setFilterAndSearch}

          />)
            
          ) : (
            <AssignGoals loadData={loadData} openSnackBar={openSnackBar} user="manager" />
          )}
        </div>
        <CommonSnackbar
        open={open}
        closeSnackbar={closeSnackbar}
        />

      </>
    );
  };
  
  export default GoalReviewer;
  