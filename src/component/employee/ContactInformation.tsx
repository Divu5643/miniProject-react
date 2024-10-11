import React from 'react'
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';
import IProfile from '../../utils/Interfaces/IProfile';

const ContactInformation = ({profileInfo}:{profileInfo:IProfile}) => {
  return (
   <>
  <Grid container  size={8} spacing={2} >
        
        <Grid size={6}>
          <Box sx={{ padding: 2 }}>
            
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1">{profileInfo.email}</Typography>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box sx={{  padding: 2 }}>
            
            <Typography variant="h6">Phone:</Typography>
            <Typography variant="body1">{profileInfo.phone}</Typography>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box sx={{ padding: 2 }}>
            
            <Typography variant="h6">Personal Email</Typography>
            <Typography variant="body1">{profileInfo.personalEmail}</Typography>
          </Box>
        </Grid>
      </Grid>
   </>
  )
}

export default ContactInformation