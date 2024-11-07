import {
  Button,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import IshowGoal from "../../utils/Interfaces/IGoals";
import Axios from "../../axios/config";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NoData from "../../component/common/NoData";
import { setTitle } from "../../redux/slice/userSlice";
import { ToTitleCase } from "../../utils/StringFunction";
const EmployeeGoals:React.FC = () => {

  // Snackbar
  const [open, setOpen] = React.useState({ open: false, message: "" });
  const closeSnackbar = () => setOpen({ open: false, message: "" });
  const openSnackBar = (message: string) =>
    setOpen({ open: true, message: message });

  const dispatch = useDispatch();
  // other states
  const userID = useSelector((state: RootState) => state.loginData.userId);
  const [goalList, setGoalList] = React.useState<IshowGoal[]>([]);
  
  useEffect(() => {
    dispatch(setTitle("Goals"));
    Axios.post("/goal/getGoalsForEmployee", { userID: userID })
      .then((response) => {
        setGoalList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        openSnackBar(error.message);
      });
  }, []);


  const handleChangeStatus = (goalId: Number) => {
    Axios.post("/goal/markAsInProgress", { userID: goalId })
      .then((response) => {
        openSnackBar("Goal marked as In Progress");
        setGoalList(
          goalList.map((goal) => {
            if (goal.goalId == goalId) {
              goal.status = "in-progress";
            }
            return goal;
          })
        );
      })
      .catch((error) => {
        openSnackBar(error.message);
      });
  };



  return (
    <>

      {/* < ContentHeader title='Goals' /> */}
      <div className="page-content">
        <Paper elevation={6}>
          {goalList.length ==0 ? <NoData />
            :
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="table-header">
                <TableRow>
                  <TableCell className="table-header-data" align="left">
                    Goal Outcome
                  </TableCell>
                  <TableCell className="table-header-data" align="left">
                    Completion Date
                  </TableCell>
                  <TableCell className="table-header-data" align="left">
                    Status
                  </TableCell>
                  <TableCell className="table-header-data" align="center">
                    Assigend By
                  </TableCell>
                  <TableCell className="table-header-data" align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                {goalList.map((goal) => {
                  var completionDate = new Date(goal.completionDate.toString());
                  return (  
                    <TableRow>
                      <TableCell className="table-data">
                        {goal.goalOutcome}
                      </TableCell>
                      <TableCell className="table-data">
                        {completionDate.toDateString()}
                      </TableCell>
                      <TableCell className="table-data">
                        {goal.status}
                      </TableCell>
                      <TableCell className="table-data" align="center">
                        {ToTitleCase(goal.assignerName)}
                      
                      </TableCell>
                      {goal.status == "pending" && (
                        <TableCell className="table-data" align="right">
                          <Button
                            onClick={() => handleChangeStatus(goal.goalId)}
                          >
                            Mark as In Progress
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
}
        </Paper>
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

export default EmployeeGoals;
