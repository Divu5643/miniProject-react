import React from 'react'
import Grid from '@mui/material/Grid2';
import { Paper, TextField } from '@mui/material';
const ProfileSetting = () => {
  return (
    <>
    <div className="page-header">
        <h1 className="page-title">Employee Details</h1>
    </div>
    <Paper className="page-content">
        

        <Grid container spacing={2} size={8}>
        <Grid size={{xs:7,md:6}}>
            <TextField label="Email" />
        </Grid>
        <Grid size={{xs:7,md:6}}>
            <TextField label="Password" type='password' />
        </Grid>
        <Grid size={{xs:7,md:6}}>
            <TextField label="Name" />
        </Grid>
        <Grid size={{xs:7,md:6}}>
            <TextField label="Date of Birth" />
        </Grid>
        <Grid size={{xs:7,md:6}}>
            <TextField label="Gender" />
        </Grid>
        <Grid size={{xs:7,md:6}}>
            <TextField label="Phone" />
        </Grid>
        </Grid>
        </Paper>
    
    </>
  )
}

export default ProfileSetting