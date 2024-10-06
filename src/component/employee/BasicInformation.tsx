import { Box, Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2';
import React from 'react'

const BasicInformation = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={4}>
          <Box sx={{ border: '1px solid #ccc', padding: 2 }}>
            <img
              src="https://via.placeholder.com/150"
              alt="profile"
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        </Grid2>
        <Grid2 container size={8} spacing={2}>
        
          <Grid2 size={6}>
            <Box sx={{ padding: 2 }}>
              
              <Typography variant="h6">Name</Typography>
              <Typography variant="body1">John Doe</Typography>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={{  padding: 2 }}>
              
              <Typography variant="h6">Designation</Typography>
              <Typography variant="body1">Software Engineer</Typography>
            </Box>
          </Grid2>

          
          <Grid2 size={6}>
            <Box sx={{  padding: 2 }}>
              
              <Typography variant="h6">Department</Typography>
              <Typography variant="body1">Microsoft</Typography>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={{  padding: 2 }}>
              
              <Typography variant="h6">Reporting Manager</Typography>
              <Typography variant="body1">Bikash Pradhan</Typography>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={{  padding: 2 }}>
              
              <Typography variant="h6">Date of Birth</Typography>
              <Typography variant="body1">01 Jan 1990</Typography>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={{  padding: 2 }}>
              
              <Typography variant="h6">Gender</Typography>
              <Typography variant="body1">Male</Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default BasicInformation