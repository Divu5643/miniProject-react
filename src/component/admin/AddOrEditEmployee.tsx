import React from 'react'
import {
    Button,
    MenuItem,
    Snackbar,
    TextField,
  } from "@mui/material";
  import Grid from "@mui/material/Grid2";
  import { Iuser } from "../../utils/Interfaces/Iuser";
  import employeeSchema from "../../validation/AddEmployeeValidation";
  import { ValidationError } from "yup";
  import { useNavigate } from "react-router-dom";
  import Axios from "../../axios/config";

const AddOrEditEmployee = () => {
    const [formData, setFormData] = React.useState<Iuser>({
        userId: 0,
        name: "",
        email: "",
        password: "",
        role: "",
        department: "",
        isDeleted: false,
      });
      const [error,setError] = React.useState({
        name: "",
        email: "",
        password: "",
        role: "",
        department: "",
      });
  return (
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
    {/* <Grid size={{xs:10,sm:8,md:5}} spacing={2}>
      <Button onClick={FormSubmit}sx={{margin:"1rem"}} variant="contained" type="submit"> Submit</Button>
      <Button variant="contained" onClick={()=>navigate("/admin/employees")} > Cancel</Button>
    </Grid> */}
  </Grid>
  )
}

export default AddOrEditEmployee