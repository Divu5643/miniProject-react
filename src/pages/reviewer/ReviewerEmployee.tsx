import { IconButton, Paper, Snackbar } from "@mui/material";
import React, { useEffect } from "react";
import Axios from "../../axios/config";
import { IuserByManager } from "../../utils/Interfaces/IReviewer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReviewerEmployeeTable from "../../component/reviewer/ReviewerEmployeeTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const ReviewerEmployee = () => {
  const [open, setOpen] = React.useState({ open: false, message: "" });
  const closeSnackbar = () => setOpen({ open: false, message: "" });
  const openSnackBar = (message: string) =>
    setOpen({ open: true, message: message });


  const userList =  useSelector((state:RootState) =>state.userList);
  const managerID = useSelector((state: RootState) => state.loginData.userId);
  const [employeeList, setEmployeeList] = React.useState<IuserByManager[]>([]);

  useEffect(() => {
    Axios.post("/reviewer/getUserByManager", { userID: managerID })
      .then((response) => {
        console.log(response.data);
        setEmployeeList(response.data);
        
      })
      .catch((error) => {
        openSnackBar(error.message);
      });
  }, []);
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Employees</h1>
      </div>
      <div className="page-content">
        <Paper elevation={6}>
          <ReviewerEmployeeTable employeeList={employeeList} assesment={false} />
        </Paper>
      </div>
      <Snackbar
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        sx={{ maxWidth: "250px" }}
        open={open.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        message={open.message}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeSnackbar}
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default ReviewerEmployee;
