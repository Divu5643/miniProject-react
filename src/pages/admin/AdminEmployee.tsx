import {
  Button,
  IconButton,
  Snackbar,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { RootState } from "../../redux/store/store";
import React, { useEffect } from "react";
import Axios from "../../axios/config";
import "../../assets/css/AdminEmployee.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserList } from "../../redux/slice/userSlice";
import { Iuser } from "../../utils/Interfaces/Iuser";
import { useNavigate } from "react-router-dom";
import TableSkeletonLoading from "../../component/common/TableSkeletonLoading";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const AdminEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserList = useSelector((state: RootState) => state.userList);
  const [tabValue, setTabValue] = React.useState<string>("all");
  const [filterList, setFilterList] = React.useState<Iuser[]>([]);
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    filterUserList(newValue);
  };
  useEffect(() => {
    console.log("useEffectRun");
    Axios.get("/getAllUsers")
      .then((response) => {
        dispatch(setUserList(response.data));
        setFilterList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        
        setIsLoading(false);
        setFilterList(currentUserList);
      });
  }, []);

  const filterUserList = (category: string) => {
    if (category == "all") {
      setFilterList(currentUserList);
      return;
    }
    let newList = currentUserList;
    newList = newList.filter((user) => user.role == category);
    setFilterList(newList);
  };

  return (
    <>
      <div className="page-header">
        <h4 className="page-title">Users</h4>
      </div>
      <div className="page-content">
        <div className="tabs">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab value="all" label="All Users" />
            <Tab value="manager" label="Managers" />
            <Tab value="employee" label="Employees" />
          </Tabs>
          <Button
            variant="outlined"
            startIcon={<PersonAddAltRoundedIcon />}
            size="small"
            onClick={() => {
              navigate("/admin/addEmployee");
            }}
          >
            Add Employee
          </Button>
        </div>

        <div className="table-container">
        {isLoading ? <TableSkeletonLoading  column={4} /> :  filterList.length == 0 ? (
            "No Users Found"
          ) : (
            <EmployeeTable userList={filterList} />
          )} 
        
        </div>
      </div>
    </>
  );
};

const EmployeeTable = ({ userList }: { userList: Iuser[] }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState({open:false,message:""});
  const closeSnackbar = () => setOpen({open:false,message:""});
  const openSnackBar = (message:string) =>setOpen({open:true,message:message});
  const HandleDelete = (userID: Number) => {
    console.log("user",userID)
    Axios.post("/deleteUser", { 
      userID:userID
     })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        openSnackBar("Cannot Delete : "+error.message);
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
                <TableRow key={user.userid} >
                  <TableCell>
                    {" "}
                    {user.name.charAt(0).toUpperCase()}
                    {user.name.slice(1)}
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">
                    {user.role.charAt(0).toUpperCase()}
                    {user.role.slice(1)}
                  </TableCell>
                  <TableCell align="right">
                    {user.department.toUpperCase()}
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="text" onClick={()=>{navigate("/admin/EditEmployee", { state: user });}}  >Edit </Button> |
                    <Button
                      variant="text"
                     
                      onClick={() => {
                        HandleDelete(user.userid);
                      }}
                    >
                      Delete
                    </Button>
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
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={open.message}
        action={ <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={closeSnackbar}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>}
      />
    </>
  );
};

export default AdminEmployee;
