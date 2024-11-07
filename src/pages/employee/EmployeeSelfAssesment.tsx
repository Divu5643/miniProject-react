import { IconButton, Paper, Snackbar } from '@mui/material'
import React from 'react'
import AssesmentForm from '../../component/common/AssesmentForm'
import { useDispatch } from 'react-redux'
import { setTitle } from '../../redux/slice/userSlice'

const EmployeeSelfAssesment:React.FC = () => {
  const dispatch = useDispatch();
  dispatch(setTitle("Self Assesment"));
  return (
    <>
        {/* < ContentHeader title='Self Assesment' /> */}
    <div className="page-content">
        <Paper>
          <AssesmentForm  />
        </Paper>
        
    </div>
    </>
  )
}

export default EmployeeSelfAssesment