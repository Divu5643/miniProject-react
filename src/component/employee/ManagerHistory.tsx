import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react'
import { IReviewShow } from '../../utils/Interfaces/IReviewer';

const ManagerHistory:React.FC<{managerList:IReviewShow[]}> = ({managerList}) => {
  return (
    <>
      <Grid container  size={{xs:12,sm:10,md:12}} spacing={2} sx={{}} >
    {managerList.map((item,index)=>{
        return(
          <>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Box sx={{ padding: 2,textAlign:"center" }} >
             
              <Typography variant="body1">{index+1}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 5 }}>
            <Box sx={{ padding: 2,  }}>
              <Typography variant="h6">Manager Name</Typography>
              <Typography variant="body1">{item.managerName}</Typography>
            </Box>
          </Grid><Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <Box sx={{ padding: 2 }}>

                <Typography variant="h6">Review Type</Typography>
                <Typography variant="body1">{item.reviewType}</Typography>
              </Box>
            </Grid>
            </>
            
          )
        }) }
        </Grid>
    
    </>
  )
}

export default ManagerHistory