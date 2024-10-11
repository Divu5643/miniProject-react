import { IconButton, Paper, Snackbar } from '@mui/material'
import React from 'react'
import AssesmentForm from '../../component/common/AssesmentForm'

const EmployeeSelfAssesment = () => {
 
  return (
    <>
    <div className="page-header">
        <h1 className="page-title">Self Assesment</h1>
    </div>
    <div className="page-content">
        <Paper>
          <AssesmentForm  />
        </Paper>
        
    </div>
    </>
  )
}

export default EmployeeSelfAssesment