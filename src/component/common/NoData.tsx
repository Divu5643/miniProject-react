import { Paper } from '@mui/material'
import React from 'react'

const NoData:React.FC = () => {
  return (
    <>
    <Paper elevation={6} sx={{padding:"2rem"}} >
        <h4 style={{textAlign:"center",fontSize:"1.2rem"}} > No data Available</h4>
    </Paper>
    </>
  )
}

export default NoData