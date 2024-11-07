import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import Axios from "../../axios/config";
import { IuserByManager } from "../../utils/Interfaces/IReviewer";
import ReviewerEmployeeTable from "../../component/reviewer/ReviewerEmployeeTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import NoData from "../../component/common/NoData";
import CommonSnackbar from "../../component/common/CommonSnackbar";
import { setTitle } from "../../redux/slice/userSlice";

const ReviewerEmployee:React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState({ open: false, message: "" });
  const closeSnackbar = () => setOpen({ open: false, message: "" });
  const openSnackBar = (message: string) =>
    setOpen({ open: true, message: message });
  const managerID = useSelector((state: RootState) => state.loginData.userId);
  const [employeeList, setEmployeeList] = React.useState<IuserByManager[]>([]);


  useEffect(() => {
    dispatch(setTitle("Employee"));
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
      {/* < ContentHeader title='Employees' /> */}
      <div className="page-content">
        <Paper elevation={6}>
          {employeeList.length == 0 ? (
            <NoData />
          ) : (
            <ReviewerEmployeeTable
              formType="profile"
              employeeList={employeeList}
              assesment={false}
            />
          )}
        </Paper>
      </div>
      <CommonSnackbar open={open.open} closeSnackbar={closeSnackbar} />
    </>
  );
};

export default ReviewerEmployee;
