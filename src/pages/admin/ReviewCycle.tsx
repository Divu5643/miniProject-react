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
  TablePagination,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Iuser } from "../../utils/Interfaces/Iuser";
import Axios from "../../axios/config";
import { IReviewShow } from "../../utils/Interfaces/IReviewer";
import ReviewerSchema from "../../validation/ReviewerValidation";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ValidationError } from "yup";
import { CircularProgress } from "@mui/joy";
import { ToTitleCase } from "../../utils/StringFunction";
import { setTitle } from "../../redux/slice/userSlice";
import DeleteModal from "../../component/common/DeleteModal";

const ReviewCycle: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState({ open: false, message: "" });
  const closeSnackbar = () => setOpen({ open: false, message: "" });
  const openSnackBar = (message: string) =>
    setOpen({ open: true, message: message });

  // delete modal States
  const [deleteModalOpen, setDeleteModalOpen] = React.useState({
    open: false,
    userId: 0,
  });
  const handleDeleleteModalOpen = (reviewId: number) => {
    setDeleteModalOpen({ open: true, userId: reviewId });
  };
  const handleDeleleteModalClose = () => {
    setDeleteModalOpen({ open: false, userId: 0 });
  };

  const [isRequestLoading, setIsRequestLoading] = React.useState(false);

  const [employeeList, setEmployeeList] = React.useState<Iuser[]>([]);
  const [managerList, setManagerList] = React.useState([]);
  const [permanentEmpList, setPermanentEmpList] = React.useState([]);
  const [totalCount,setTotalCount] = React.useState(0); 
  const [filterAndSearch, setFilterAndSearch] = React.useState({
    RowCount: 5,
    PageNumber: 0,
  });
  const [formData, setFormData] = useState<{
    employeeId: string | Number;
    managerId: string | Number;
    reviewType: string;
  }>({
    employeeId: "",
    managerId: "",
    reviewType: "",
  });
  const [error, setError] = React.useState({
    employeeId: "",
    managerId: "",
    reviewType: "",
  });

  const [ReviewList, setReviewList] = useState<IReviewShow[]>([]);

  const handleAdd = () => {
    setIsRequestLoading(true);
    ReviewerSchema.validate(formData, { abortEarly: false })
      .then((response) => {
        setError({ employeeId: "", managerId: "", reviewType: "" });
        Axios.post("/reviewer/addReviewer", response)
          .then((response) => {
            let newList  = employeeList.filter((emp)=> emp.userid!= formData.employeeId);
            setEmployeeList(newList); 
            loadReviewData();
            setFormData({
              employeeId: "",
              managerId: "",
              reviewType: "",
            });
            loadReviews();
            setIsRequestLoading(false);
          })
          .catch((error) => {
            setIsRequestLoading(false);
            openSnackBar("Cannot Assign Managers :" + error.message);
          });
      })
      .catch((err: ValidationError) => {
        let errArr = err?.inner || [];
        let errorObj: any = {
          EmployeeId: "",
          ManagerId: "",
          ReviewType: "",
        };
        errArr.map((err) => {
          errorObj[err?.path as string] = err?.message;
        });

        setIsRequestLoading(false);
        setError(errorObj);
      });
  };
  const filterEmployeeList = (newReviewList: IReviewShow[], locPermanentEmpList = permanentEmpList) => {
    let reviewedIds: Number[] = newReviewList.map((review: IReviewShow) => {
      return review.employeeId;
    });

    console.log("perman", locPermanentEmpList);
    let newList = locPermanentEmpList.filter((employee: Iuser) => {
      return !reviewedIds.includes(employee.userid);
    });
    setEmployeeList(newList);
  };
  const deleteReview = (reviewId: Number) => {
    Axios.put("/reviewer/deleteReview", { reviewId: reviewId })
      .then((response) => {
        var newList = ReviewList.filter((review) => {
          return review.reviewId !== reviewId;
        });
        filterEmployeeList(newList);
        loadReviews();
        loadReviewData();
        handleDeleleteModalClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
const loadReviews =()=>{
  Axios.post("/reviewer/getReviews",filterAndSearch)
  .then((response2) => {
    setReviewList(response2.data.reviewList);
    setTotalCount(response2.data.totalCount);
  })
  .catch((error) => {
    openSnackBar("Cannot Load Data : " + error.message);
  });
}
  const loadReviewData = async () => {
    await Axios.get("/user/getAllEmployeeForReview")
      .then(async (response1) => {
        setPermanentEmpList(response1.data);
        setEmployeeList(response1.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
     

    Axios.get("/user/getAllManager")
      .then((response) => {
        setManagerList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    dispatch(setTitle("Review Cycle"));
    loadReviewData();
    loadReviews();
  }, []);

  useEffect(()=>{
    loadReviews();
  },[filterAndSearch])

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setFilterAndSearch({...filterAndSearch,PageNumber: newPage});
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
  
    setFilterAndSearch({...filterAndSearch,
       RowCount: parseInt(event.target.value, 10),
       PageNumber:0});

  };


  return (
    <>
      {/* < ContentHeader title='Review Cycle' /> */}
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
                    value={formData.employeeId}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        employeeId: parseInt(event.target.value),
                      });
                    }}
                    required={true}
                    error={error.employeeId == "" ? false : true}
                    helperText={error.employeeId}
                  >
                    {employeeList.map((emp: Iuser) => {
                      return (
                        <MenuItem key={emp.userid} value={emp.userid}>
                          {ToTitleCase(emp.name)}
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
                    value={formData.managerId}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        managerId: parseInt(event.target.value),
                      });
                    }}
                    error={error.managerId == "" ? false : true}
                    helperText={error.managerId}
                  >
                    {managerList.map((manager: Iuser) => {
                      return (
                        <MenuItem key={manager.userid} value={manager.userid}>
                          {ToTitleCase(manager.name)}
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
                    value={formData.reviewType}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        reviewType: event.target.value,
                      });
                    }}
                    error={error.reviewType == "" ? false : true}
                    helperText={error.reviewType}
                  >
                    <MenuItem value="quaterly">Quaterly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </TextField>
                </TableCell>
                <TableCell align="center">
                  {isRequestLoading ? (
                    <CircularProgress
                      color="primary"
                      determinate={false}
                      size="md"
                      value={64}
                      variant="plain"
                    />
                  ) : (
                    <Button
                      onClick={() => {
                        handleAdd();
                      }}
                      variant="contained"
                      sx={{ backgroundColor: "#507687" }}
                    >
                      Add
                    </Button>
                  )}
                </TableCell>
              </TableRow>
              {ReviewList.map((review: IReviewShow) => {
                return (
                  <TableRow>
                    <TableCell className="table-data" align="left">
                      {ToTitleCase(review.employeeName)}
                    </TableCell>
                    <TableCell className="table-data" align="left">
                      {ToTitleCase(review.managerName)}
                    </TableCell>
                    <TableCell className="table-data" align="left">
                      {ToTitleCase(review.reviewType)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="text"
                        onClick={() => {
                          handleDeleleteModalOpen(review.reviewId)
                          
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                colSpan={5}
                count={totalCount}
                rowsPerPage={filterAndSearch.RowCount}
                page={filterAndSearch.PageNumber}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
        <DeleteModal
        open={deleteModalOpen}
        handleClose={handleDeleleteModalClose}
        handleDelete={deleteReview}
        />
      </div>
    </>
  );
};

export default ReviewCycle;
