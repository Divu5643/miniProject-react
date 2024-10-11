import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { IconButton, Snackbar } from '@mui/material'
import IAssesmentFormData from "../../utils/Interfaces/IAssesnment";
import AssesmentSchema from "../../validation/AssesmentValidation";
import { ValidationError } from "yup";
import Axios from "../../axios/config";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/joy";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';



const AssesmentForm = () => {

  const [open, setOpen] = React.useState({open:false,message:""});
  const closeSnackbar = () => setOpen({open:false,message:""});
  const openSnackBar = (message:string) =>setOpen({open:true,message:message});

  const creatorId =  useSelector((state:RootState) =>state.loginData.userId);
  const [isRequestLoading,setIsRequestLoading] = React.useState<Boolean>(false);
    let {employeeId} =  useParams();
    if(employeeId === undefined){
      employeeId = creatorId.toString();
    }
    console.log("creatorId : ",creatorId)
    const [formData,setFormData] = React.useState<IAssesmentFormData>({
        technicalSkill: "",
        softSkill: "",
        teamworkSkill:"",
        deliveryTime:"",
        remark:""})
     const [error,setError] = React.useState({
        technicalSkill: "",
        softSkill: "",
        teamworkSkill:"",
        deliveryTime:"",
        remark:""})


    const handleSubmitForm= ()=>{
      setIsRequestLoading(true);
        AssesmentSchema.validate(formData,{abortEarly:false}).then((response)=>{
            setError({
                technicalSkill: "",
        softSkill: "",
        teamworkSkill:"",
        deliveryTime:"",
        remark:""})
              
            Axios.post("/performance/savePerformance",{...formData,UserId:employeeId,createdBy:creatorId})
            .then((response)=>{
                console.log("axio result:",response.data);
                openSnackBar("Performance saved successfully");
                setFormData({ technicalSkill: "",
                  softSkill: "",
                  teamworkSkill:"",
                  deliveryTime:"",
                  remark:""});
                setIsRequestLoading(false);
            })


        }).catch((err:ValidationError) => {
            console.log(err);
            let errArr = err?.inner || [];
            let errorObj: any= {
                technical: "",
                soft: "",
                teamwork:"",
                delivery:"",
               remarks:"" };
            errArr.map((err) => {
                console.log(typeof(err))
              errorObj[err?.path as string] = err?.message;
             setError(errorObj);
             setIsRequestLoading(false);
            });
          });
    }
  return (
    <>
      <Paper elevation={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          container
          size={9}
          sx={{ padding: "1rem", display: "flex", justifyContent: "center" }}
          rowSpacing={4}
          spacing={8}
        >
          <Grid size={{ xs: 8, md: 6, lg: 6 }}>
            <TextField fullWidth label="Technical Skill" type="number" 
            value={formData.technicalSkill} 
            onChange={(event)=>{setFormData({...formData, technicalSkill:event.target.value})}}
            required
            error={error.technicalSkill ==""? false:true}
            helperText={error.technicalSkill} 
            
            />
          </Grid>
          <Grid size={{ xs: 8, md: 6, lg: 6 }}>
            <TextField fullWidth label="Soft Skill" type="number"
             value={formData.softSkill} 
             onChange={(event)=>{setFormData({...formData, softSkill:event.target.value})}}
             required
             error={error.softSkill ==""? false:true}
            helperText={error.softSkill} 
            />
          </Grid>
          <Grid size={{ xs: 8, md: 6, lg: 6 }}>
            <TextField fullWidth label="Teamwork" type="number"
             value={formData.teamworkSkill} 
             required
             onChange={(event)=>{setFormData({...formData, teamworkSkill:event.target.value})}}
             error={error.teamworkSkill ==""? false:true}
            helperText={error.teamworkSkill} 
            />
          </Grid>
          <Grid size={{ xs: 8, md: 6, lg: 6 }}>
            <TextField fullWidth label="Delivery Time" type="number"
             value={formData.deliveryTime} 
             required
             onChange={(event)=>{setFormData({...formData, deliveryTime:event.target.value})}}
             error={error.deliveryTime ==""? false:true}
            helperText={error.deliveryTime } 
            />
          </Grid>
          <Grid size={{ xs: 8, md: 12, lg: 12 }}>
            <TextField fullWidth label="Remark" 
             value={formData.remark} 
             required
             onChange={(event)=>{setFormData({...formData, remark:event.target.value})}}
             error={error.remark ==""? false:true}
             helperText={error.remark }
             multiline 
             />
          </Grid>
          <Grid size={{ xs: 8, md: 12, lg: 12 }}>
            {isRequestLoading ?
             <CircularProgress /> : 
            <Button variant="contained" onClick={()=>handleSubmitForm()}>Submit Review</Button>}
            
          </Grid>
        </Grid>
      </Paper>{" "}
      <Snackbar
        anchorOrigin={{ horizontal:'left',vertical: 'bottom' }}
        sx={{maxWidth: "250px"}}
        open={open.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={open.message}
        action={ <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={closeSnackbar}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>}
      />
    </>
  );
};

export default AssesmentForm;
