import { Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material'
import React, { useEffect } from 'react'
import Axios from '../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { IPerfomanceData } from '../../utils/Interfaces/IAssesnment';
import EmployeeReviews from './EmployeeReviewHistory';
import GoalProgress from './GoalProgress';
import ProfileNavigation from '../../component/common/ProfileNavigation';
import ContentHeader from '../../component/common/ContentHeader';

const EmployeeDashboard = () => {

  const [tabValue, setTabValue] = React.useState("reviews");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    
   <>
 < ContentHeader title='Dashboard' />
      <div className="page-content">
        <Paper elevation={6} sx={{padding:"1rem"}} >
        <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab value="reviews" label="Performance Reviews" />
            <Tab value="goals" label="Goals Progress" />
          </Tabs>

          {tabValue=="reviews"?<EmployeeReviews />: <GoalProgress/>}


        </Paper>
      </div>
   </>
  )
}




export default EmployeeDashboard