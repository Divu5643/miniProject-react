import React from 'react'
import Grid from '@mui/material/Grid2';
import { Box, Typography } from '@mui/material';

const ContactInformation = () => {
  return (
   <>
  <Grid container  size={8} spacing={2} >
        
        <Grid size={6}>
          <Box sx={{ padding: 2 }}>
            
            <Typography variant="h6">Email</Typography>
            <Typography variant="body1">jhon@bfl.com</Typography>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box sx={{  padding: 2 }}>
            
            <Typography variant="h6">Phone:</Typography>
            <Typography variant="body1">+916364986667</Typography>
          </Box>
        </Grid>
      </Grid>
   </>
  )
}

export default ContactInformation