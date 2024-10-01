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
} from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import AddReviewModal from "../../component/admin/AddReviewModal";
import { RootState } from "../../redux/store/store";
import { Iuser } from "../../utils/Interfaces/Iuser";
import Axios from "../../axios/config";
import IReviewer, { IReviewShow } from "../../utils/Interfaces/IReviewer";
import ReviewerSchema from "../../validation/ReviewerValidation";
import { ValidationError } from "yup";

const ReviewCycle = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const employeeList: Iuser[] = useSelector((state: RootState) =>
    state.userList.filter((item) => item.role == "employee")
  );
  const managerList: Iuser[] = useSelector((state: RootState) =>
    state.userList.filter((item) => item.role == "manager")
  );
  const [formData, setFormData] = useState<IReviewer>({
    EmployeeId: 0,
    ManagerId: 0,
    ReviewType: "",
  });
const [ReviewList,setReviewList] = useState<IReviewShow[]>([]);
  const handleAdd = () => {
    ReviewerSchema.validate(formData, { abortEarly: false })
      .then((response) => {
        // console.log(response)
        Axios.post("/reviewer/addReviewer",response).then((response)=>{
          console.log(response);
        }).catch(error=>{console.log(error);})
      })
      .catch((err: ValidationError) => {
        console.log(err);
        let errArr = err?.inner || [];
        let errorObj: any = {
          name: "",
          email: "",
          password: "",
          role: "",
          department: "",
        };
        errArr.map((err) => {
          console.log(typeof err);
          errorObj[err?.path as string] = err?.message;
          console.log("Error Object", errorObj);
          // setError(errorObj);
        });
      });
  };
  useEffect(()=>{
Axios.get("/reviewer/getReviews").then((response)=>{
  setReviewList(response.data);
})
  },[])

  return (
    <>
      <div className="page-header">
        <div
          className="page-title"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Review Cycle</span>
          <Button
            variant="outlined"
            startIcon={<NoteAddIcon />}
            onClick={() => {
              setOpen(true);
            }}
            sx={{ border: "1px solid #507687", color: "#507687" }}
          >
            {" "}
            Add Review
          </Button>
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
                    variant="filled"
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
                    variant="filled"
                    label="manager"
                    select={true}
                    required={true}
                    value={formData.ManagerId}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        ManagerId: parseInt(event.target.value),
                      });
                    }}
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
                    variant="filled"
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
                  >
                    <MenuItem value="quaterly">Quaterly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </TextField>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      handleAdd();
                    }}
                    variant="contained"
                    sx={{ backgroundColor: "#507687" }}
                  >
                    {" "}
                    Add
                  </Button>
                </TableCell>
              </TableRow>
              {ReviewList.map((review:IReviewShow)=>{
                return (<TableRow>
                  <TableCell className="table-data" align="left" >{review.employeeName}</TableCell>
                  <TableCell className="table-data" align="left" >{review.managerName}</TableCell>
                  <TableCell className="table-data" align="left" >{review.reviewType}</TableCell>
                  <TableCell align="center" >
                    <Button variant="text">Edit</Button> |{" "}
                    <Button variant="text">Delete</Button>
                  </TableCell>
                </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <AddReviewModal open={open} setOpen={setOpen} /> */}
    </>
  );
};

export default ReviewCycle;
