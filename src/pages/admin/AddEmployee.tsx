import {
  Button,
  CircularProgress,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { Iuser } from "../../utils/Interfaces/Iuser";
import employeeSchema from "../../validation/AddEmployeeValidation";
import { ValidationError } from "yup";
import { useNavigate } from "react-router-dom";
import Axios from "../../axios/config";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [isRequestLoading,setIsRequestLoading] =  React.useState(false);
  const[userSaved,setUserSaved] =  React.useState(false);
  const [formData, setFormData] = React.useState<Iuser>({
    userid: 0,
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
    designation:"",
    isDeleted: false,
  });
  const [error,setError] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "",
    designation:"",
    department: "",
  });

  const FormSubmit = async()=>{
    setIsRequestLoading(true);
    await employeeSchema.validate(formData,{abortEarly:false})
    .then((response)=>{
      setError({name: "",
        email: "",
        password: "",
        role: "",
        designation:"",
        department: "",})
      Axios.post("/user/createUser",formData).then((response)=>{
        setUserSaved(true);
        setIsRequestLoading(false);
        setFormData({
          userid: 0,
          name: "",
          email: "",
          password: "",
          role: "",
          department: "",
          designation:"",
          isDeleted: false,
        })
        setTimeout(()=>navigate("/admin/employees"),1000);
        
      }).catch(error=>{
        console.log(error);
        setIsRequestLoading(false)})
    })
    .catch((err:ValidationError) => {
      console.log(err);
      let errArr = err?.inner || [];
      let errorObj: any= {name: "",
        email: "",
        password: "",
        role: "",
        department: "",};
      errArr.map((err) => {
          console.log(typeof(err))
        errorObj[err?.path as string] = err?.message;
        console.log("Error Object",errorObj)
          setError(errorObj);
          setIsRequestLoading(false);
      });
    });
  }

  return (
    <>
      <div className="page-header">
        <h4 className="page-title">Add Employee</h4>
      </div>
      <div className="page-content" style={{ padding: "2rem" }}>
        <Grid container rowSpacing={8} columnSpacing={{ xs: 1, sm: 2, md: 8 }}>
          <Grid size={{xs:10,sm:8,md:5}}>
            <TextField
              fullWidth={true}
              size="medium"
              variant="outlined"
              label="Name"
              required={true}
              error={error.name==""?false:true}
              value={formData.name}
              helperText={error.name}
              onChange={(event)=>{setFormData({...formData,name:event.target.value.toLowerCase()})}}
            />
          </Grid>
          <Grid size={{xs:10,sm:8,md:5}}>
            <TextField
              fullWidth={true}
              size="medium"
              variant="outlined"
              label="Email"
              required={true}
              error={error.email==""?false:true}
              helperText={error.email}
              value={formData.email}
              onChange={(event)=>{setFormData({...formData,email:event.target.value.toLowerCase()})}}
            />
          </Grid>
          <Grid size={{xs:10,sm:8,md:5}}>
            <TextField
              fullWidth={true}
              size="medium"
              variant="outlined"
              label="password"
              type="password"
              required={true}
              error={error.password==""?false:true}
              helperText={error.password}
              value={formData.password}
              onChange={(event)=>{setFormData({...formData,password:event.target.value})}}
            />
          </Grid>
          <Grid size={{xs:10,sm:8,md:5}}>
            <TextField
              fullWidth={true}
              size="medium"
              variant="outlined"
              label="Department"
              required={true}
              error={error.department==""?false:true}
              helperText={error.department}
              value={formData.department}
              onChange={(event)=>{setFormData({...formData,department:event.target.value.toLowerCase()})}}
            />
          </Grid>
          <Grid size={{xs:10,sm:8,md:5}}>
            <TextField
              fullWidth={true}
              size="medium"
              variant="outlined"
              label="Role"
              select={true}
              required={true}
              error={error.role==""?false:true}
              helperText={error.role}
              value={formData.role}
              onChange={(event)=>{setFormData({...formData,role:event.target.value})}}
            >
             <MenuItem  value="admin">
              Admin
            </MenuItem>
            <MenuItem  value="manager">
              Manager
            </MenuItem>
            <MenuItem  value="employee">
              Employee
            </MenuItem>
            </TextField>
          </Grid>
          <Grid size={{xs:10,sm:8,md:5}}>
            <TextField
              fullWidth={true}
              size="medium"
              variant="outlined"
              label="Designation"
              required={true}
              error={error.designation==""?false:true}
              helperText={error.designation}
              value={formData.designation}
              onChange={(event)=>{setFormData({...formData,designation:event.target.value.toLowerCase()})}}
            />
          </Grid>
          <Grid size={{xs:10,sm:8,md:5}} spacing={2} sx={{display:"flex",alignItems:"center", gap:"20px"}} >
            {isRequestLoading 
            ?<CircularProgress />
              :<Button onClick={FormSubmit}sx={{margin:"1rem"}} variant="contained" type="submit">Submit</Button>}
            <Button variant="contained" onClick={()=>navigate("/admin/employees")} > Cancel</Button>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        open={userSaved}
        autoHideDuration={6000}
        onClose={()=>{setUserSaved(false);}}
        message="Employee Saved"
        
      />
    </>
  );
};
export default AddEmployee;
