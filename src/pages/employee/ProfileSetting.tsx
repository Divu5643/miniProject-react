import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import {
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import IProfile from "../../utils/Interfaces/IProfile";
import employeeProfileSchema from "../../validation/ProfileValidation";
import { ValidationError } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import Axios from "../../axios/config";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CommonSnackbar from "../../component/common/CommonSnackbar";
import { setLoggedInUser, setTitle } from "../../redux/slice/userSlice";
import ILoginData from "../../utils/Interfaces/ILogin";
import { getRandomColor } from "../../utils/StringFunction";
const ProfileSetting:React.FC = () => {
  const [isRequestLoading, setIsRequestLoading] = React.useState(false);


const dispatch =  useDispatch();
  const navigate = useNavigate();
  const loginData:ILoginData = useSelector((state: RootState) => state.loginData);
  
  const [open,setOpen] = React.useState({open: false, message:""});
  const closeSnackbar = ()=>setOpen({open: false, message:""});
  const openSnackBar = (message: string) => setOpen({open: true, message: message});
    
  // const [formData, setFormData] = React.useState<IProfile>({ ...profileInfo, 
  //   dateOfBirth: profileInfo.dateOfBirth == null? null : dayjs(profileInfo.dateOfBirth.$d)});
      
  const [formData, setFormData] = React.useState<IProfile>({userId:loginData.userId,
    name:"",
    designation:"",
    department:"",
    reportingManager:"",
    dateOfBirth:null,
    gender:"",
    email:"",
    phone:"",
    personalEmail:""});

  useEffect(()=>{
    dispatch(setTitle("Profile Setting"))
    Axios.post("/profile/getEmployeeDetails",{userID:loginData.userId})
    .then((response)=>{
        console.log("response:",response.data)
        setFormData({...response.data,
          dateOfBirth: response.data.dateOfBirth ==null ?null :dayjs(response.data.dateOfBirth)});
    }).catch((error)=>{
      setFormData({
        userId:loginData.userId,
        name:"",
        designation:"",
        department:"",
        reportingManager:"",
        dateOfBirth:null,
        gender:"",
        email:"",
        phone:"",
        personalEmail:""
      });
    });
  },[])
  
  const [error, setError] = React.useState({
    personalEmail: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
  });

  const formSubmit = () => {
 
    setIsRequestLoading(true);

    employeeProfileSchema
      .validate(formData, { abortEarly: false })
      .then((response) => {
        setError({
          personalEmail: "",
          name: "",
          dateOfBirth: "",
          gender: "",
          phone: "",
        });
        // axios call to update employee profile
        Axios.post("/profile/editEmployeeDetails", 
            {...formData,
                dateOfBirth: formData.dateOfBirth?.format("YYYY-MM-DD")})
          .then((result) => {
                
                openSnackBar("Profile updated successfully");
            setIsRequestLoading(false);
            dispatch(setLoggedInUser({user:{...loginData,username:formData.name?.toString()}, AvatarColor:getRandomColor()}))
            setFormData({
            })
            navigate(`/${loginData.role}/selfProfile`, { replace: true });

          })
          .catch((error) => {
            console.log("error", error);
            setIsRequestLoading(false);
          });
      })
      .catch((err: ValidationError) => {
        console.log(err);
        let errArr = err?.inner || [];
        let errorObj: any = {
          personalEmail: "",
          name: "",
          dateOfBirth: "",
          gender: "",
          phone: "",
        };

        errArr.map((err) => {
          console.log(typeof err);
          errorObj[err?.path as string] = err?.message;
          console.log("Error Object", errorObj);
          setError(errorObj);
          setIsRequestLoading(false);
        });
      });
  };

  return (
    <>
      
      {/* <ContentHeader title="Employee Details" /> */}
      <div className="page-content">
        <Paper
          elevation={6}
          className="paper-inside-content"
          sx={{ display: "flex", justifyContent: "center", padding: "1.5rem" }}
        >
          <Grid container spacing={3} size={{ xs: 12, sm: 10, md: 8 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Personal Email"
                value={formData.personalEmail}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    personalEmail: event.target.value,
                  });
                }}
                error={error.personalEmail == "" ? false : true}
                helperText={error.personalEmail}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(event) => {
                  setFormData({ ...formData, name: event.target.value });
                }}
                error={error.name == "" ? false : true}
                helperText={error.name}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%" }}
              defaultValue={null}
              value={formData.dateOfBirth}
              maxDate={dayjs(new Date())}
              onChange={(newValue) => {
                setFormData({ ...formData, dateOfBirth: newValue });
              }}
              slots={{
                textField:(params)=><TextField 
                {...params}
                error={error.dateOfBirth == "" ? false : true}
            helperText={error.dateOfBirth}
            InputProps={params.InputProps}
            inputProps={params.inputProps}
                />
              }}
              label="Date Of Birth"
            />
          </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Gender"
                value={formData.gender}
                onChange={(event) => {
                  setFormData({ ...formData, gender: event.target.value });
                }}
                error={error.gender == "" ? false : true}
                helperText={error.gender}
                select
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(event) => {
                  setFormData({ ...formData, phone: event.target.value });
                }}
                error={error.phone == "" ? false : true}
                helperText={error.phone}
              />
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", gap: "30px", alignItems: "center" }}
            >
              {isRequestLoading ? (
                <CircularProgress
                  variant="indeterminate"
                  sx={{ width: "56px" }}
                />
              ) : (
                <Button variant="contained" onClick={() => formSubmit()}>
                  Submit
                </Button>
              )}
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  navigate(`/${loginData.role}/Selfprofile`);
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <CommonSnackbar open={open.open} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default ProfileSetting;
