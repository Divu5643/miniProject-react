import React from 'react'
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';
import IProfile from '../../utils/Interfaces/IProfile';


const ContactInformation:React.FC<{profileInfo:IProfile}> = ({profileInfo}) => {
  return (
   <>
  <Grid container  size={{xs:12,sm:8,md:6}} spacing={2} >
        
        <Grid size={{xs:12,sm:6,md:6}}>
          <Box sx={{ padding: 2 }}>
            
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1">{profileInfo.email}</Typography>
          </Box>
        </Grid>
        <Grid size={{xs:12,sm:6,md:6}}>
          <Box sx={{  padding: 2 }}>
            
            <Typography variant="h6">Phone:</Typography>
            <Typography variant="body1">{profileInfo.phone}</Typography>
          </Box>
        </Grid>
        <Grid size={{xs:12,sm:6,md:6}}>
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