
import {
    IconButton,
    MenuItem,
    Snackbar,
    Tab,
    Tabs,
    TextField,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import "../../assets/css/AdminGoals.css";
  import GoalsTable from "../../component/common/GoalsTable";
  import Axios from "../../axios/config";
  import IshowGoal from "../../utils/Interfaces/IGoals";
  import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
  import AssignGoals from "../../component/admin/AssignGoals";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import NoData from "../../component/common/NoData";
import GoalSearch from "../../component/common/GoalSearch";
import ContentHeader from "../../component/common/ContentHeader";
  let permanaentGoalList: IshowGoal[] = [];
  const  setPermanaentGoalList = (list:IshowGoal[])=>{
    permanaentGoalList = list;
  }

  const GoalReviewer = () => {
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
    const [goalList, setGoalList] = React.useState<IshowGoal[]>([]);
    const userId =  useSelector((state:RootState)=>state.loginData.userId);
    const loadData = () => {
      Axios.post("/goal/getGoalsByManager",{userID: userId})
        .then((response) => {
          console.log("response:", response.data)
          setGoalList(response.data);
          permanaentGoalList = response.data;
        })
        .catch((error) => {
          openSnackBar(error.message);
        });

        
    };
  
    useEffect(() => {
      loadData();
    }, []);
  
    useEffect(() => {
  
      if (filterValue == "pending") {
        const newList = permanaentGoalList.filter((goal) => {
          return goal.status == "pending";
        });
        setGoalList(newList);
      } else if (filterValue == "complete") {
        const newList = permanaentGoalList.filter((goal) => {
          return goal.status == "complete";
        });
        setGoalList(newList);
      } else if (filterValue == "progress") {
        const newList = permanaentGoalList.filter((goal) => {
          return goal.status == "in-progress";
        });
        setGoalList(newList);
      } else {
        setGoalList(permanaentGoalList);
      }
    }, [filterValue]);  
  
    return (
      <>
        < ContentHeader title='Goals' />
        <div className="page-content" style={{margin:0}} >
          <div className="tabs-container">
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab value="all" label="All Goals" />
              <Tab value="manager" label="Assign Goals" />
            </Tabs>
            {tabValue == "all" && (<>
               <div className="SearchContainer" >
               <GoalSearch isGoal={true} permanentList={permanaentGoalList}  setGoalList={setGoalList} />
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
          />)
            
          ) : (
            <AssignGoals loadData={loadData} openSnackBar={openSnackBar} user="manager" />
          )}
        </div>
        <Snackbar
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          sx={{ maxWidth: "250px" }}
          open={open.open}
          autoHideDuration={4000}
          onClose={closeSnackbar}
          message={open.message}
          action={
            <>
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
    );
  };
  
  export default GoalReviewer;
  