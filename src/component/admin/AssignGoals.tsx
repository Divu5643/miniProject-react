import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, MenuItem, Paper, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Iuser } from "../../utils/Interfaces/Iuser";
import GoalSchema from "../../validation/GoalValidation";
import { ValidationError } from "yup";
import Axios from "../../axios/config";
import { CircularProgress } from "@mui/joy";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const AssignGoals = ({
  loadData,
  openSnackBar,
}: {
  loadData: Function;
  openSnackBar: Function;
}) => {
  const [isRequestLoading, setIsRequestLoading] = React.useState(false);
  const loggedInUserId = useSelector((state: RootState) => {
    return state.userId;
  });
  const userList = useSelector((state: RootState) =>
    state.userList.filter((item: Iuser) => item.role == "employee")
  );
  const [formData, setFormData] = useState<{
    userId: string | Number;
    goalOutcome: string;
    completionDate: Dayjs|null;
  }>({
    userId: "",
    goalOutcome: "",
    completionDate: dayjs(),
  });
  const [error, setError] = React.useState({
    userId: "",
    goalOutcome: "",
    completionDate: "",
  });

  const handleSubmit = async () => {
    console.log(formData);
    setIsRequestLoading(true);
    await GoalSchema.validate(formData, { abortEarly: false })
      .then((response) => {
        setError({ userId: "", goalOutcome: "", completionDate: "" });
        console.log(loggedInUserId);
        let postBody = { ...formData, createdBy: loggedInUserId };

        Axios.post("/goal/CreateGoal", postBody)
          .then((response) => {
            loadData();
            setFormData({ userId: "", goalOutcome: "", completionDate: dayjs() });
            setIsRequestLoading(false);
            openSnackBar("Goal Saved");
          })
          .catch((err) => {
            setIsRequestLoading(false);
            openSnackBar(err.message);
          });
      })
      .catch((err: ValidationError) => {
        console.log(err);
        let errArr = err?.inner || [];
        let errorObj: any = { userId: "", goalOutcome: "", completionDate: "" };
        errArr.map((err) => {
          console.log(typeof err);
          errorObj[err?.path as string] = err?.message;

          setError(errorObj);
          setIsRequestLoading(false);
        });
      });
  };
  return (
    <>
      <Grid container rowSpacing={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{display:"flex",justifyContent:"center"}} >
        <Grid size={{xs:10,sm:8,md:4}}>
          <TextField
            fullWidth={true}
            select={true}
            variant="standard"
            label="Employee"
            value={formData.userId}
            onChange={(event) => {
              setFormData({ ...formData, userId: event.target.value });
            }}
            error={error.userId == "" ? false : true}
            helperText={error.userId}
          >
            {userList.map((user) => {
              return (
                <MenuItem key={user.userid} value={user.userid}>
                  {user.name}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        <Grid size={{xs:0,sm:0,md:2}}></Grid>
        <Grid size={{xs:10,sm:8,md:4}}>
          <TextField
            fullWidth={true}
            label="Goal Outcome"
            variant="standard"
            value={formData.goalOutcome}
            onChange={(event) => {
              setFormData({ ...formData, goalOutcome: event.target.value });
            }}
            error={error.goalOutcome == "" ? false : true}
            helperText={error.goalOutcome}
          />
        </Grid>

        <Grid size={{xs:10,sm:8,md:4}}>
          {/* <TextField
            fullWidth={true}
            label="Completion Date"
            type="date"
            variant="outlined"
            value={formData.completionDate}
            onChange={(event) => {
              setFormData({ ...formData, completionDate: event.target.value });
            }}
            error={error.completionDate == "" ? false : true}
            helperText={error.completionDate}
          /> */}
           <LocalizationProvider dateAdapter={AdapterDayjs} >
             <DatePicker
             sx={{width:"100%"}}
             value={formData.completionDate}
             onChange={(newValue) => {
                 setFormData({...formData, completionDate: newValue });
             }}
             label="Completion Date" />
             </LocalizationProvider>
        </Grid>
        <Grid size={{xs:0,sm:0,md:2}}></Grid>
        <Grid size={{xs:10,sm:8,md:4}}>
          <div
            style={{ display: "flex", height: "100%", alignItems: "center" }}
          >
            {isRequestLoading ? (
              <CircularProgress
                color="primary"
                determinate={false}
                size="md"
                value={64}
                variant="plain"
              />
            ) : (
              <Button variant="contained" onClick={handleSubmit} sx={{backgroundColor:"#6a9ab0"}} >
                Save
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AssignGoals;
