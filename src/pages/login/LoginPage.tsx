import { Button, CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import LoginSchema from "../../validation/LoginVaidation";
import { ValidationError } from "yup";
import Axios from "../../axios/config";
import CustomAlert from "../../component/common/Alert";
import ILoginData from "../../utils/Interfaces/ILogin";
import { setEmployeeList, setLoggedInUser, setUserList } from "../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { getRandomColor } from "../../utils/StringFunction";
import { userRole } from "../../utils/Interfaces/Iuser";
const LoginPage:React.FC = () => {
  const authenticated = useSelector((state:RootState) => state.isAuthenticated);
  const loggedInData = useSelector((state:RootState) => state.loginData);
  const [isRequestLoading, setIsRequestLoading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = React.useState({ open: false, message: "" });

  const handleClose = () => {
    setAlert({ open: false, message: "" });
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    setIsRequestLoading(true);
    LoginSchema.validate(formData, { abortEarly: false })
      .then((response) => {
        setError({ email: "", password: "" });
        Axios.post("/user/Loginuser", formData)
          .then((result) => {
            const user: ILoginData = {
              username: result.data.name,
              role: userRole[result.data.roleId] ,
              email: result.data.email,
              userId: result.data.userid,
            };
          
            const AvatarColor = getRandomColor();
            setIsRequestLoading(false);
            dispatch(setLoggedInUser({user,AvatarColor}));
            LoadData(user.role, user.userId);
            navigate(`/${user.role}`);
          })
          .catch((error) => {
            
            setIsRequestLoading(false); 
            if (error.code == "ERR_NETWORK") {
              setAlert({ open: true, message: error.message });
            } else {
              setAlert({ open: true, message: error.response.data });
            }
          });
      })
      .catch((err: ValidationError) => {
        
        let errArr = err?.inner || [];
        let errorObj: any = {
          name: "",
          email: "",
          password: "",
          role: "",
          department: "",
        };
        errArr.map((err) => {
        
          errorObj[err?.path as string] = err?.message;
          setError(errorObj);
          setIsRequestLoading(false);
        });
      });
  };
  const LoadData = (role: string, userId: Number) => {
    if (role == "admin") {
      Axios.get("/user/getAllUsers").then((response) => {
        dispatch(setUserList(response.data));
      });
    } else if (role == "manager") {
      Axios.post("/reviewer/getUserByManager", { userID: userId }).then(
        (response) => {
          dispatch(setEmployeeList(response.data));
        }
      );
    }
  };
useEffect(()=>{
if(authenticated){

  navigate(`/${loggedInData.role}`);
}
},[])
  return (
    <>
    <div className="body-container">

      <div className="signUpContainer">
        <div className="title">
          <h2>Sign in</h2>
          <h5>Welcome User, Please sign in to continue</h5>
        </div>

        <div className="form-container">
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", justifyContent: "center" }}
            >
            <Grid size={{ sm: 8, md: 10 }}>
              <TextField
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailRoundedIcon />{" "}
                      </InputAdornment>
                    ),
                  },
                }}
                label="Email"
                required
                fullWidth={true}
                value={formData.email}
                onChange={(event) => {
                  setFormData({ ...formData, email: event.target.value });
                }}
                error={error.email == "" ? false : true}
                helperText={error.email}
                />
            </Grid>
            <Grid size={{ sm: 8, md: 10 }}>
              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                          >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <Password />{" "}
                      </InputAdornment>
                    ),
                  },
                }}
                required
                fullWidth={true}
                value={formData.password}
                onChange={(event) => {
                  setFormData({ ...formData, password: event.target.value });
                }}
                error={error.password == "" ? false : true}
                helperText={error.password}
                />
            </Grid>
            <Grid size={{ sm: 8, md: 8 }}>
              <Button
                variant="contained"
                fullWidth
                disabled={isRequestLoading}
                onClick={() => {
                  handleSubmit();
                }}
                >
                {isRequestLoading ? <CircularProgress /> : "Sign In"}
                
              </Button>
            </Grid>
          </Grid>
          {alert.open && (
            <CustomAlert
            open={alert.open}
            message={alert.message}
            handleClose={handleClose}
            />
          )}
        </div>
      </div>
          </div>
    </>
  );
};

export default LoginPage;
