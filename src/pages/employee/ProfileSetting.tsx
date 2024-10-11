import React from 'react'
import Grid from '@mui/material/Grid2';
import { Button, MenuItem, Paper, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import IProfile from '../../utils/Interfaces/IProfile';
import employeeProfileSchema from '../../validation/ProfileValidation';
import { ValidationError } from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import Axios from '../../axios/config';
const ProfileSetting = () => {
const {state} = useLocation();
const { profileInfo} = state;
const navigate = useNavigate();
const userId = useSelector((state:RootState)=>state.loginData.userId);
const [formData,setFormData] = React.useState<IProfile>(profileInfo);
const [error,setError] = React.useState({
    personalEmail:"",
    name: "",
    dateOfBirth:"",
    gender:"",
    phone:""
});

const formSubmit= ()=>{
employeeProfileSchema.validate(formData,{abortEarly:false})
.then((response)=>{
    setError({personalEmail:"",
        name: "",
        dateOfBirth:"",
        gender:"",
        phone:""});
 // axios call to update employee profile
Axios.post("/profile/editEmployeeDetails",formData).then((result)=>{
    console.log(result.data);
}).catch((error)=>{ console.log("error",error)})
    


}).catch((err:ValidationError) => {
    console.log(err);
    let errArr = err?.inner || [];
    let errorObj: any= {
        personalEmail:"",
        name: "",
        dateOfBirth:"",
        gender:"",
        phone:"",};

    errArr.map((err) => {
        console.log(typeof(err))
      errorObj[err?.path as string] = err?.message;
      console.log("Error Object",errorObj)
        setError(errorObj);
    });
  });
}

  return (
    <>
    <div className="page-header">
        <h1 className="page-title">Employee Details</h1>
    </div>
    <div className="page-content">

    <Paper elevation={6} sx={{display:"flex",justifyContent:"center", padding:"1.5rem"}}>
        <Grid container spacing={3} size={8}  >
        <Grid size={{xs:7,md:6}}>
            <TextField 
            fullWidth
            label="Personal Email"
            value={formData.personalEmail}
            onChange={(event)=>{setFormData({...formData,personalEmail:event.target.value})}}
            error={error.personalEmail==""?false:true}
            helperText={error.personalEmail}
            />
        </Grid>
        {/* <Grid size={{xs:7,md:6}}>
             <TextField fullWidth label="Password" type='password'
            value={formData.password}
            onChange={(event)=>{setFormData({...formData,email:event.target.value})}}
            /> 
        </Grid> */}
        <Grid size={{xs:7,md:6}}>
            <TextField fullWidth label="Name" 
            value={formData.name}
            onChange={(event)=>{setFormData({...formData, name:event.target.value})}}
            error={error.name==""?false:true}
            helperText={error.name}
            />
        </Grid>
        <Grid size={{xs:7,md:6}}>
            <TextField  fullWidth label="Date of Birth" 
            value={formData.dateOfBirth}
            onChange={(event)=>{setFormData({...formData,dateOfBirth:event.target.value})}}
            error={error.dateOfBirth==""?false:true}
            helperText={error.dateOfBirth}
            />
        </Grid>
        <Grid size={{xs:7,md:6}}>
            <TextField fullWidth label="Gender" 
            value={formData.gender}
            onChange={(event)=>{setFormData({...formData,gender:event.target.value})}}
            error={error.gender==""?false:true}
            helperText={error.gender}
            select
            >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>

                 </TextField>

        </Grid>
        <Grid size={{xs:7,md:6}}>
            <TextField fullWidth label="Phone"
            value={formData.phone}
            onChange={(event)=>{setFormData({...formData,phone:event.target.value})}}
            error={error.phone==""?false:true}
            helperText={error.phone}
            />
        </Grid>
        <Grid size={{xs:7,md:6}} sx={{display:"flex",gap:"30px",alignItems:"center"}} >
            <Button variant='contained' onClick={()=>formSubmit()} >Submit</Button>
            <Button variant='contained' color='error' onClick={()=>{navigate("/employee/profile")}}  >Cancel</Button>
        </Grid>
        </Grid>
        </Paper>
            </div>
    
    </>
  )
}

export default ProfileSetting