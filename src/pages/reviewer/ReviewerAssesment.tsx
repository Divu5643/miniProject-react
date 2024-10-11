import { Paper } from '@mui/material'
import React from 'react'
import { useSelector, UseSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import ReviewerEmployeeTable from '../../component/reviewer/ReviewerEmployeeTable'
const ReviewerAssesment = () => {
  
  const employeeList =  useSelector((state:RootState) =>state.employeeList);
  return (
    <>
    <div className="page-header">
        <h1 className="page-title">Assesment</h1>
    </div>
    <div className="page-content">
      <Paper elevation={6}>
      <ReviewerEmployeeTable employeeList={employeeList} assesment={true} />
      </Paper>
    </div>
    </>
  )
}


export default ReviewerAssesment