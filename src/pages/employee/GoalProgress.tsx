import React, { useEffect } from "react";
import Axios from "../../axios/config";
import IshowGoal from "../../utils/Interfaces/IGoals";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import CommonSnackbar from "../../component/common/CommonSnackbar";
import NoData from "../../component/common/NoData";

const GoalProgress:React.FC = () => {
  const [open, setOpen] = React.useState({ open: false, message: "" });
  const closeSnackbar = () => setOpen({ open: false, message: "" });
  const openSnackBar = (message: string) =>
    setOpen({ open: true, message: message });

  const userID = useSelector((state: RootState) => state.loginData.userId);
  const [goalList, setGoalList] = React.useState<IshowGoal[]>([]);
  useEffect(() => {
    console.log("userId : ", userID);
    Axios.post("/goal/getGoalsForEmployee", { userID: userID })
      .then((response) => {
        // console.log("response:", response.data);
        setGoalList(response.data);
      })
      .catch((error) => {
        openSnackBar(error.message);
      });
  }, []);
  return (
    <div>
      {goalList.length ==0 ?  <NoData />
      :
      goalList.map((goal) => {
        return <SingleGoalCard key={goal.goalId} goal={goal} />;
      })
                }
      <CommonSnackbar open={open} closeSnackbar={closeSnackbar} />
    </div>
  );
};

const SingleGoalCard = ({ goal }: { goal: IshowGoal }) => {
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState({ bool: false, message: "" });
  let today = new Date();
  let startDate = new Date(goal.startDate);
  let endDate = new Date(goal.completionDate);

  useEffect(() => {

    if (goal.status == "in-progress") {
      console.log(goal.goalId, ": In Progress");
      let total = endDate.getTime() - startDate.getTime();
      let progressed = today.getTime() - startDate.getTime();
      let progressPercentage = (progressed / total) * 100;
      if(progressPercentage > 100) {progressPercentage = 90;}
      if (total < 0) {
        setStatus({ bool: true, message: "Goal Has Ended but not completed." });
      }
      setProgress(progressPercentage);
    } else if (goal.status == "complete") {
      setProgress(100);
    } else {
      setStatus({ bool: true, message: "Goal is Still in Pending stage" });
    }
  }, []);

  return (
    <div>
      <Paper elevation={6} sx={{ padding: "1rem", margin: "1rem" }}>
        <div className="card-title">
          <h4 style={{ margin: "10px", color: "#000000b8" }}>
            {goal.goalOutcome}
          </h4>
          <div className="in-progress">
            <div
              className="labels"
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px",
              }}
            >
              <div className="start-label">{startDate.toDateString()}</div>
              <div className="end-label">{endDate.toDateString()}</div>
            </div>
            {status.bool ? (
              <div style={{ color: "red",textAlign:"center" }}>{status.message}</div>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    color="inherit"
                    value={Math.round(progress)}
                    sx={{ height: 10, borderRadius: 3, color: "#507687" }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                  >{`${Math.round(progress)}%`}</Typography>
                </Box>
              </Box>
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default GoalProgress;
