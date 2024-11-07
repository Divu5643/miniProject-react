import { Paper } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import ReviewerEmployeeTable from '../../component/reviewer/ReviewerEmployeeTable'
import Axios from '../../axios/config'
import { IuserByManager } from '../../utils/Interfaces/IReviewer'
import CommonSnackbar from '../../component/common/CommonSnackbar'
import NoData from '../../component/common/NoData'
import { setTitle } from '../../redux/slice/userSlice'

const ReviewerAssesment:React.FC = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState({ open: false, message: "" });
    const closeSnackbar = () => setOpen({ open: false, message: "" });
    const openSnackBar = (message: string) =>
      setOpen({ open: true, message: message });

  
  const managerID = useSelector((state: RootState) => state.loginData.userId);
  const [employeeList,setEmployeeList] = React.useState<IuserByManager[]>([]);
  useEffect(() => {
    dispatch(setTitle("Assesment"));
    Axios.post("/reviewer/getUserByManager", { userID: managerID })
      .then((response) => {
        setEmployeeList(response.data);
      })
      .catch((error) => {
        openSnackBar(error.message);
      });
  }, []);
  return (
    <>
    {/* < ContentHeader title='Assesment' /> */}
    <div className="page-content">
      <Paper elevation={6}>
        {employeeList.length ==0 ?<NoData />
        :      
      <ReviewerEmployeeTable formType={'review'}  employeeList={employeeList} assesment={true} />
        }
      </Paper>
    </div>
    <CommonSnackbar open={open.open} closeSnackbar={closeSnackbar} />
    </>
  )
}


export default ReviewerAssesment