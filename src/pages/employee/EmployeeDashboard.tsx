import { Paper, Tab, Tabs } from '@mui/material'
import React  from 'react'
import { useDispatch, useSelector } from 'react-redux';

import EmployeeReviews from './EmployeeReviewHistory';
import GoalProgress from './GoalProgress';
import { setTitle } from '../../redux/slice/userSlice';
import CommonSnackbar from '../../component/common/CommonSnackbar';

const EmployeeDashboard:React.FC = () => {
  const dispatch = useDispatch();

  dispatch(setTitle("Dashboard"));
  const [tabValue, setTabValue] = React.useState("reviews");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // For snackbar
    const [open, setOpen] = React.useState({ open: false, message: "" });
  const closeSnackbar = () => setOpen({ open: false, message: "" });
  const openSnackBar = (message: string) =>
    setOpen({ open: true, message: message });

  return (
    
   <>
 {/* < ContentHeader title='Dashboard' /> */}
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
      <CommonSnackbar open={open} closeSnackbar={closeSnackbar} />
   </>
  )
}




export default EmployeeDashboard