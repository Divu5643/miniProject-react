import {
    Button,
    IconButton,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
  import React, { useEffect } from "react";
  import Axios from "../../axios/config";
  import "../../assets/css/AdminEmployee.css";

  import { Iuser,userRole } from "../../utils/Interfaces/Iuser";
  import { Link, useNavigate } from "react-router-dom";

  import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
  import { ToTitleCase } from "../../utils/StringFunction";

  import DeleteModal from "../../component/common/DeleteModal";
import { IDepartment } from "../../utils/Interfaces/IDepartment";

const EmployeeTable:React.FC<{
  userList: Iuser[];
  changeUserList: React.Dispatch<React.SetStateAction<Iuser[]>>;
  totalCount:number
  // setTotalCount:React.Dispatch<React.SetStateAction<number>>
  filterAndSearch:any,
  setFilterAndSearch:any
}> = ({
    userList,
    changeUserList,
    totalCount,
    // setTotalCount,
    filterAndSearch,
    setFilterAndSearch
  }) => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState({ open: false, message: "" });
    const closeSnackbar = () => setOpen({ open: false, message: "" });
    const openSnackBar = (message: string) =>
      setOpen({ open: true, message: message });
  
    const [openModal, setOpenModal] = React.useState({open:false,userId:0});
    const handleOpenModal = (userId:number) => setOpenModal({open:true,userId});
    const handleCloseModal = () => setOpenModal({open:false,userId:0});
    const [departmentList, setDepartmentList] = React.useState<IDepartment[]>([]);
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setFilterAndSearch({...filterAndSearch,PageNumber: newPage});
  
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
    
      setFilterAndSearch({...filterAndSearch,
         RowCount: parseInt(event.target.value, 10),
         PageNumber:0});
 
    };
    useEffect(()=>{

      Axios.get("department/getAllDepartments").then((response) => {
        console.log("departmentList:", response.data);
        setDepartmentList(response.data);
      });
    },[])

  
    const HandleDelete = (userID: Number) => {
      Axios.post("/user/deleteUser", {
        userID: userID,
      })
        .then((response) => {
          let newList = userList.filter((user) => {
            return user.userid !== userID;
          });
          changeUserList(newList);
          handleCloseModal();
          openSnackBar("User deleted successfully");
        })
        .catch((error) => {
          handleCloseModal();
          openSnackBar("Cannot Delete : " + error.message);
        });
    };
    return (
      <>
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-header">
                  <TableCell className="table-header-data">Employee Name</TableCell>
                  <TableCell className="table-header-data" align="right">
                    Email
                  </TableCell>
                  <TableCell className="table-header-data" align="right">
                    Role
                  </TableCell>
                <TableCell className="table-header-data" align="right">
                  Department
                </TableCell>
                <TableCell className="table-header-data" align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user) => {
                return (
                  <TableRow key={user.userid}>
                    <TableCell>
                      <Link
                        className="profile-Link"
                        to={`/admin/profile/${user.userid}`}
                      >
                        {ToTitleCase(user.name)}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">
                      
                      {ToTitleCase(userRole[user.roleId])}
                      
                    </TableCell>
                    <TableCell align="right">
                      {departmentList.map(dept=>{
                        return dept.deptId === user.deptId && <span>{ToTitleCase(dept.deptartment)}</span>
                      })}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="text"
                        onClick={() => {
                          navigate("/admin/EditEmployee", { state: user });
                        }}
                      >
                        Edit{" "}
                      </Button>{" "}
                      |
                      <Button
                        variant="text"
                        onClick={() => {
                          handleOpenModal(user.userid);
                        }}
                        color="error"
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
          autoHideDuration={3000}
          onClose={closeSnackbar}
          message={open.message}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeSnackbar}
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          }
        />
        <DeleteModal 
        open={openModal}
        handleClose={handleCloseModal}
        handleDelete={HandleDelete} />
      </>
    );
  };
  export default EmployeeTable;