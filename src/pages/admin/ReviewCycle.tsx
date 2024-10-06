import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TableBody,
  TextField,
  MenuItem,
  Snackbar,
  IconButton,
} from "@mui/material";

import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store/store";
import { Iuser } from "../../utils/Interfaces/Iuser";
import Axios from "../../axios/config";
import { IReviewShow } from "../../utils/Interfaces/IReviewer";
import ReviewerSchema from "../../validation/ReviewerValidation";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { ValidationError } from "yup";
import { CircularProgress } from "@mui/joy";


const ReviewCycle = () => {
  const [open, setOpen] = React.useState({open:false,message:""});
  const closeSnackbar = () => setOpen({open:false,message:""});
  const openSnackBar = (message:string) =>setOpen({open:true,message:message});

  const [isRequestLoading,setIsRequestLoading] = React.useState(false);

  let tempemployeeList: Iuser[] = useSelector((state: RootState) =>
    state.userList.filter((item: Iuser) => item.role == "employee")
  );
  const [employeeList, setEmployeeList] = React.useState(tempemployeeList);
  const managerList: Iuser[] = useSelector((state: RootState) =>
    state.userList.filter((item: Iuser) => item.role == "manager")
  );
  const [formData, setFormData] = useState<{
    EmployeeId: string | Number;
    ManagerId: string | Number;
    ReviewType: string;
  }>({
    EmployeeId: "",
    ManagerId: "",
    ReviewType: "",
  });
  const [error,setError] =  React.useState({  EmployeeId: "",
    ManagerId: "",
    ReviewType: "",})
  const [ReviewList, setReviewList] = useState<IReviewShow[]>([]);
  const handleAdd = () => {
    setIsRequestLoading(true);
    ReviewerSchema.validate(formData, { abortEarly: false })
      .then((response) => {
        setError({ EmployeeId: "",
          ManagerId: "",
          ReviewType: "",});
        Axios.post("/reviewer/addReviewer", response)
          .then((response) => {
            console.log(response);
            loadReviewData();
            setFormData({
              EmployeeId: "",
              ManagerId: "",
              ReviewType: "",
            });
            setIsRequestLoading(false);
          })
          .catch((error) => {
            setIsRequestLoading(false);
            openSnackBar("Cannot Assign Managers :"+error.message);
          });
      })
      .catch((err: ValidationError) => {
        console.log(err);
        let errArr = err?.inner || [];
        let errorObj: any = {
          EmployeeId: "",
          ManagerId: "",
          ReviewType: "",
        };
        errArr.map((err) => {
          console.log(typeof err);
          errorObj[err?.path as string] = err?.message;
          
        });
        setIsRequestLoading(false);
        setError(errorObj);
      });
  };
  const filterEmployeeList = (newReviewList:IReviewShow[])=>{
    let reviewedIds: Number[] = newReviewList.map((review: IReviewShow) => {
      return review.employeeId;
    });
    setEmployeeList(tempemployeeList.filter((employee) => {
      return !(reviewedIds.includes(employee.userid));
    }));
  }
  const deleteReview = (reviewId:Number)=>{
    Axios.put("/reviewer/deleteReview",{reviewId:reviewId}).then((response)=>{
      var newList = ReviewList.filter((review)=>{return review.reviewId !== reviewId})
      filterEmployeeList(newList);
      setReviewList(newList)
    }).catch((error)=>{
      console.log(error);
    });
  }
  
  const loadReviewData = () => {
    Axios.get("/reviewer/getReviews").then((response) => {
      setReviewList(response.data);
      filterEmployeeList(response.data);
      
    }).catch((error) => {
      openSnackBar("Cannot Load Data : "+error.message);
    });
  };
  useEffect(() => {
    loadReviewData();
  }, []);

  return (
    <>
      <div className="page-header">
        <div
          className="page-title"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Review Cycle</span>
         
        </div>
      </div>
      <div className="page-content">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="table-header">
                <TableCell className="table-header-data" align="center">
                  Employee Name
                </TableCell>
                <TableCell className="table-header-data" align="center">
                  Employee Manager
                </TableCell>
                <TableCell className="table-header-data" align="center">
                  Review Cycle Type
                </TableCell>
                <TableCell className="table-header-data" align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  className="table-data"
                  align="left"
                  sx={{ padding: "1rem" }}
                >
                  <TextField
                    fullWidth={true}
                    variant="standard"
                    label="Employee"
                    select={true}
                    value={formData.EmployeeId}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        EmployeeId: parseInt(event.target.value),
                      });
                    }}
                    required={true}
                    error= {error.EmployeeId==""?false:true}
                    helperText={error.EmployeeId}
                  >
                    {employeeList.map((emp) => {
                      return (
                        <MenuItem key={emp.userid} value={emp.userid}>
                          {emp.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </TableCell>
                <TableCell
                  className="table-data"
                  align="left"
                  sx={{ padding: "1rem" }}
                >
                  <TextField
                    fullWidth={true}
                    variant="standard"
                    label="Manager"
                    select={true}
                    required={true}
                    value={formData.ManagerId}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        ManagerId: parseInt(event.target.value),
                      });
                    }}
                    error= {error.ManagerId==""?false:true}
                    helperText={error.ManagerId}
                  >
                    {managerList.map((manager) => {
                      return (
                        <MenuItem key={manager.userid} value={manager.userid}>
                          {manager.name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </TableCell>
                <TableCell
                  className="table-data"
                  align="left"
                  sx={{ padding: "1rem" }}
                >
                  <TextField
                    fullWidth={true}
                    variant="standard"
                    label="Cycle Type"
                    select={true}
                    required={true}
                    value={formData.ReviewType}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        ReviewType: event.target.value,
                      });
                    }}
                    error= {error.ReviewType==""?false:true}
                    helperText={error.ReviewType}
                  >
                    <MenuItem value="quaterly">Quaterly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </TextField>
                </TableCell>
                <TableCell align="center">
                  {isRequestLoading?<CircularProgress
  color="primary"
  determinate={false}
  size="md"
  value={64}
  variant="plain"
/>:<Button
                    onClick={() => {
                      handleAdd();
                    }}
                    variant="contained"
                    sx={{ backgroundColor: "#507687" }}
                  >
                  
                    Add
                  </Button>}
                  
                </TableCell>
              </TableRow>
              {ReviewList.map((review: IReviewShow) => {
                return (
                  <TableRow>
                    <TableCell className="table-data" align="left">
                      {review.employeeName}
                    </TableCell>
                    <TableCell className="table-data" align="left">
                      {review.managerName}
                    </TableCell>
                    <TableCell className="table-data" align="left">
                      {review.reviewType}
                    </TableCell>
                    <TableCell align="center">
                      
                      <Button variant="text" onClick={()=>{deleteReview(review.reviewId)}}>Delete</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
        anchorOrigin={{ horizontal:'left',vertical: 'bottom' }}
        sx={{maxWidth: "250px"}}
        open={open.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        message={open.message}
        action={<>
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
      </div>
      
    </>
  );
};

export default ReviewCycle;
