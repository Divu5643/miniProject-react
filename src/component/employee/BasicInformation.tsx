import { Box, Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2';
import React from 'react'
import IProfile from '../../utils/Interfaces/IProfile';

const BasicInformation = ({profileInfo}:{profileInfo:IProfile}) => {
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
              <Typography variant="body1">{profileInfo.name}</Typography>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={{  padding: 2 }}>
              
              <Typography variant="h6">Designation</Typography>
              <Typography variant="body1">{profileInfo.designation}</Typography>
            </Box>
          </Grid2>

          
          <Grid2 size={6}>
            <Box sx={{  padding: 2 }}>
              
              <Typography variant="h6">Department</Typography>
              <Typography variant="body1">{profileInfo.department}</Typography>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={{  padding: 2 }}>
              
              <Typography variant="h6">Reporting Manager</Typography>
              <Typography variant="body1">{profileInfo.reportingManager==""?"Not Assigned Yet":profileInfo.reportingManager}</Typography>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={{  padding: 2 }}>
              
              <Typography variant="h6">Date of Birth</Typography>
              <Typography variant="body1">{profileInfo.dateOfBirth}</Typography>
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={{  padding: 2 }}>
              
              <Typography variant="h6">Gender</Typography>
              <Typography variant="body1">{profileInfo.gender}</Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default BasicInformation