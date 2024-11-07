import Grid from "@mui/material/Grid2";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IshowGoal from "../utils/Interfaces/IGoals";
import { printDate, ToTitleCase } from "../utils/StringFunction";
import Axios from "../axios/config";
import { IComment } from "../utils/Interfaces/Comment";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import ILoginData from "../utils/Interfaces/ILogin";
import Modal from "@mui/material/Modal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const GoalDetails = () => {
  const navigate = useNavigate();
  const { goalId } = useParams();
  const loginData: ILoginData = useSelector(
    (state: RootState) => state.loginData
  );

  // states
  const [commentList, setCommentList] = React.useState<IComment[]>([]);
  const [commentValue, setCommentValue] = React.useState("");
  const [goalData, setGoalData] = React.useState<IshowGoal >({
    goalId :0,
    employeeName : "",
    employeeId :0,
    goalOutcome : "",
    completionDate : new Date(),
    assignerName : "",
    assignerId : 0,
    status : "",
    startDate: new Date(),
  });
  // Modal
  const [open, setOpen] = React.useState<{
    open: boolean;
    id: Number;
    status: string;
  }>({
    open: false,
    id: 0,
    status: "",
  });

  const handleEditClose = () => {
    setOpen({ open: false, id: 0, status: "" });
  };

  useEffect(() => {
    Axios.get(`/goal/getSpecificGoal?goalId=${goalId}`).then((result) => {
      setGoalData(result.data);
      // console.log(result.data);
      setOpen({ ...open, status: result.data.status });
    });

    Axios.get(`/goal/getCommentsForGoal?goalId=${goalId}`)
      .then((response) => {
        setCommentList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const handleCommentSave = () => {
    const newComment = {
      CommentText: commentValue,
      GoalId: goalId,
      CreatedBy: loginData.userId,
    };
    Axios.post(`/goal/addCommentToGoal`, newComment).then((response) => {
      console.log(response.data);
      var comment: IComment = {
        commentId: response.data.commentId,
        goalId: response.data.goalId,
        commentText: response.data.commentText,
        createdBy: response.data.createdBy,
        createdName: loginData.username,
        createdDate: response.data.createdDate,
      };
      setCommentList([comment, ...commentList]);
      setCommentValue("");
    });
  };

  const handleDelete = () => {
    Axios.put(`goal/deleteGoal/?id=${goalId}`).then((response) => {
      console.log(response);
      navigate("/manager/goal");
    });
  };
  const handleEdit = () => {
    Axios.put("/goal/editGoal", { status: open.status, userId: goalId }).then(
      (response) => {
        console.log(response);
        setOpen({ ...open, open: false });
      }
    );
  };
  var completionDate = goalData?.completionDate
    ? dayjs(new Date(goalData.completionDate))
    : dayjs(new Date());
    console.log("normalDate:",new Date(goalData.completionDate).toDateString());
    console.log("completionDate:",dayjs(new Date(goalData.completionDate).toDateString()));

  return (
    <>
      <div className="page-content">
        <Paper elevation={6}>
          <div className="goal-content" style={{ padding: "2rem" }}>
            <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
              {goalData?.goalOutcome}{" "}
            </Typography>
            <Grid container size={{ sm: 10, md: 8 }} spacing={2}>
              <Grid size={{ sm: 10, md: 6 }}>
                <Typography variant="body1">
                  Assigned to : {ToTitleCase(goalData?.employeeName)}
                </Typography>
              </Grid>
              <Grid size={{ sm: 10, md: 6 }}>
                <Typography variant="body1">
                  Assigned By : {ToTitleCase(goalData?.assignerName)}{" "}
                </Typography>
              </Grid>
              <Grid size={{ sm: 10, md: 6 }}>
                <Typography variant="body1">
                  Due Date : {printDate(completionDate.toString())}{" "}
                </Typography>
              </Grid>
              <Grid size={{ sm: 10, md: 6 }}>
                <Typography variant="body1">
                  Status : {ToTitleCase(goalData.status)}{" "}
                </Typography>
              </Grid>
              <Grid size={{ sm: 10, md: 6 }}>
                <Button
                  sx={{ textAlign: "left" }}
                  disabled={goalData.status == "complete" ? true : false}
                  onClick={() => {
                    setOpen({
                      open: true,
                      id: goalId,
                      status: goalData?.status,
                    });
                  }}
                >
                  Edit
                </Button>
                <Button color="error" onClick={handleDelete}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div className="goal-comment">
            <div className="comments">
              {commentList.map((comment: IComment) => {
                return (
                  <React.Fragment key={comment.commentId}>
                    {" "}
                    <CommentCard comment={comment} /> <Divider />{" "}
                  </React.Fragment>
                );
              })}
            </div>
            <div className="leave">
              <Typography variant="h6" sx={{ margin: "1rem auto" }}>
                Leave a Comment
              </Typography>
              <Grid
                container
                spacing={2}
                size={{ sm: 10, md: 12 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Grid size={{ sm: 10, md: 8 }}>
                  <TextField
                    fullWidth
                    multiline
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <AddCommentIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                    value={commentValue}
                    onChange={(event) => {
                      setCommentValue(event.target.value);
                    }}
                  />
                </Grid>
                <Grid size={{ sm: 10, md: 4 }}>
                  <Button variant="contained" onClick={handleCommentSave}>
                    {" "}
                    Comment
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </Paper>
      </div>

      <Modal
        open={open.open}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="allModal">
          <Grid container spacing={2} size={12}>
            <Grid size={12}>
              <Typography
                variant="h6"
                sx={{ marginBottom: "2rem", textAlign: "center" }}
              >
                Edit Goal
              </Typography>
            </Grid>
            <Grid size={6}>
              <TextField
               fullWidth 
               label="Goal Outcome"
               value={goalData.goalOutcome}
               onChange={(event)=>{
                setGoalData({...goalData,goalOutcome:event.target.value})
               }}
               />
            </Grid>
            <Grid size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  defaultValue={null}
                  value={dayjs(String(goalData.completionDate),"YYYY-MM-DD")}
                  minDate={dayjs(new Date())}
                  onChange={(newValue) => {}}
                  slots={{
                    textField: (params) => (
                      <TextField
                        {...params}
                        //error={error.completionDate == "" ? false : true}
                        //helperText={error.completionDate}
                        InputProps={params.InputProps}
                        inputProps={params.inputProps}
                      />
                    ),
                  }}
                  label="Completion Date"
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={6}>
              <TextField
                fullWidth={true}
                select={true}
                value={goalData.status}
                disabled={open.status == "complete" ? true : false}
                onChange={(event) => {
                 setGoalData({...goalData, status:event.target.value})
                }}
              >
                <MenuItem disabled ={goalData.status != "pending" ? true : false}
                 value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In-Progress</MenuItem>
                <MenuItem value="complete">Complete</MenuItem>
              </TextField>
            </Grid>
            <Grid
              size={6}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Button variant="contained" onClick={handleEdit}>
                {" "}
                Save
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleEditClose}
              >
                {" "}
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>
        {/* <div>
            <Button
              variant="contained"
              onClick={() => {
                handleEdit();
                }}
                >
                Save
                </Button>
                </div> */}
      </Modal>
    </>
  );
};

const CommentCard = ({ comment }: { comment: IComment }) => {
  var createdDate = new Date(comment.createdDate.toString());
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {comment.createdName.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={ToTitleCase(comment.createdName)}
        subheader={
          createdDate.toDateString() + " " + createdDate.toLocaleTimeString()
        }
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.commentText}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GoalDetails;
