import { IconButton, Paper, Snackbar } from '@mui/material'
import React from 'react'
import AssesmentForm from '../../component/common/AssesmentForm'
import ContentHeader from '../../component/common/ContentHeader'

const EmployeeSelfAssesment = () => {
 
  return (
    <>
        < ContentHeader title='Self Assesment' />
    <div className="page-content">
        <Paper>
          <AssesmentForm  />
        </Paper>
        
    </div>
    </>
  )
}

export default EmployeeSelfAssesment