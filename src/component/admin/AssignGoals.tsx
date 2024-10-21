import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, MenuItem, Paper, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Iuser } from "../../utils/Interfaces/Iuser";
import GoalSchema from "../../validation/GoalValidation";
import { ValidationError } from "yup";
import Axios from "../../axios/config";
import { CircularProgress } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import IshowGoal from "../../utils/Interfaces/IGoals";

const AssignGoals = ({
  loadData,
  openSnackBar,
  user,
}: {
  loadData: Function;
  openSnackBar: Function;
  user: string;
}) => {
  const [isRequestLoading, setIsRequestLoading] = React.useState(false);
  const loggedInUserId = useSelector((state: RootState) => {
    return state.loginData.userId;
  });

  const [userList, setUserList] = React.useState<Iuser[]>([]);

  const [formData, setFormData] = useState<{
    userId: string | Number;
    goalOutcome: string;
    completionDate: Dayjs | null;
  }>({
    userId: "",
    goalOutcome: "",
    completionDate: null,
  });
  const [error, setError] = React.useState({
    userId: "",
    goalOutcome: "",
    completionDate: "",
  });

  const handleSubmit = async () => {
    setIsRequestLoading(true);
    await GoalSchema.validate(formData, { abortEarly: false })
      .then((response) => {
        setError({ userId: "", goalOutcome: "", completionDate: "" });

        let postBody = {
          ...formData,
          createdBy: loggedInUserId,
          completionDate: formData.completionDate?.format("YYYY-MM-DD"),
        };
        console.log("postBody:", postBody);
        Axios.post("/goal/CreateGoal", postBody)
          .then((response) => {
            loadData();
            setFormData({
              userId: "",
              goalOutcome: "",
              completionDate: dayjs(),
            });
            setIsRequestLoading(false);
            openSnackBar("Goal Saved");
          })
          .catch((err) => {
            setIsRequestLoading(false);
            openSnackBar(err.message);
          });
      })
      .catch((err: ValidationError) => {
        let errArr = err?.inner || [];
        let errorObj: any = { userId: "", goalOutcome: "", completionDate: "" };
        errArr.map((err) => {
          errorObj[err?.path as string] = err?.message;

          setError(errorObj);
          setIsRequestLoading(false);
        });
      });
  };

  const loadEmployeesForManager = () => {
    Axios.post("/reviewer/getUserByManager", { userID: loggedInUserId })
      .then((response) => {
        let newuserList = response.data.map((user: IshowGoal) => {
          return { userid: user.employeeId, name: user.employeeName };
        });
        setUserList(newuserList);
      })
      .catch((error) => {
        openSnackBar(error.message);
      });
  };
  const loadEmployeesForAdmin = () => {
    Axios.get("/user/getAllUsers")
      .then((response) => {
        setUserList(
          response.data.filter((user: Iuser) => {
            return user.role == "employee";
          })
        );
      })
      .catch((error) => {
        openSnackBar(error.message);
      });
  };
  useEffect(() => {
    if (user == "admin") {
      loadEmployeesForAdmin();
    } else {
      loadEmployeesForManager();
    }
  }, []);

  return (
    <>
      <Grid
        container
        rowSpacing={8}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid size={{ xs: 10, sm: 8, md: 4 }}>
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
        <Grid size={{ xs: 0, sm: 0, md: 2 }}></Grid>
        <Grid size={{ xs: 10, sm: 8, md: 4 }}>
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

        <Grid size={{ xs: 10, sm: 8, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%" }}
              defaultValue={null}
              value={formData.completionDate}
              minDate={dayjs(new Date())}
              onChange={(newValue) => {
                setFormData({ ...formData, completionDate: newValue });
              }}
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    error={error.completionDate == "" ? false : true}
                    helperText={error.completionDate}
                    InputProps={params.InputProps}
                    inputProps={params.inputProps}
                  />
                ),
              }}
              label="Completion Date"
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={{ xs: 0, sm: 0, md: 2 }}></Grid>
        <Grid size={{ xs: 10, sm: 8, md: 4 }}>
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
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ backgroundColor: "#6a9ab0" }}
              >
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
