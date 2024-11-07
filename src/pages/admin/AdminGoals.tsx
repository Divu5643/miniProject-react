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
import CommonSnackbar from "../../component/common/CommonSnackbar";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slice/userSlice";
let permanaentGoalList: IshowGoal[] = [];
const setPermanaentGoalList =(list:IshowGoal[])=>{
  permanaentGoalList = list;
}
const AdminGoals:React.FC = () => {
  const dispatch = useDispatch();
  dispatch(setTitle("Goals"));
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
  
  const [filterValue, setFilterValue] = React.useState<string>("all");
  const [goalList, setGoalList] = React.useState<IshowGoal[]>([]);
const [totalCount,setTotalCount] = React.useState<number>(0);
  const [filterAndSearch, setFilterAndSearch] = React.useState({
    RowCount: 5,
    PageNumber: 0,
    FilterValue:"all",
    Search: "",
  });


  useEffect(() => {
    const logData = setTimeout(() => {
      loadData();
    }, 400);
    return () => clearTimeout(logData);
  }, [filterAndSearch]);

  const loadData=()=>{
Axios.post("/goal/getAllGoals",filterAndSearch).then((response)=>
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
            <div className="search-container">
            <TextField
              label="Search"
              variant="standard"
              fullWidth={true}
              value={filterAndSearch.Search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFilterAndSearch({
                  ...filterAndSearch,
                  Search: event.target.value,
                  PageNumber:0
                });
              }}
            />
          </div>
            <div className="filter-container">
              <TextField
                fullWidth={true}
                variant="standard"
                select={true}
                value={filterAndSearch.FilterValue}
                onChange={(event) => {
                  setFilterAndSearch({...filterAndSearch,FilterValue:event.target.value});
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
          <GoalsTable
            goalList={goalList}
            setGoalList={setGoalList}
            openSnackBar={openSnackBar}
            permanaentGoalList={permanaentGoalList}
            setPermanaentGoalList={setPermanaentGoalList}
            totalCount={totalCount}
            filterAndSearch={filterAndSearch}
            setFilterAndSearch={setFilterAndSearch}
          />
        ) : (
          <AssignGoals loadData={loadData} openSnackBar={openSnackBar} user="admin" />
        )}
      </div>
      <CommonSnackbar  open={open.open} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default AdminGoals;
