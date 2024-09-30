import { Button, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { RootState } from '../../redux/store/store';
import React, { useEffect } from 'react'
import Axios from '../../axios/config';
import "../../assets/css/AdminEmployee.css"
import { useDispatch,useSelector } from 'react-redux';
import { setUserList } from '../../redux/slice/userSlice';
import { Iuser } from '../../utils/Interfaces/Iuser';
import { useNavigate } from 'react-router-dom';

const AdminEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserList = useSelector((state:RootState)=> state.userList);
  const [tabValue, setTabValue] = React.useState<string>("all");
  const [ filterList,setFilterList] = React.useState<Iuser[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    filterUserList(newValue);
  };
  useEffect(() => {
    console.log("useEffectRun");
    Axios.get("/getAllUsers").then(response=>{
      dispatch(setUserList(response.data));
      setFilterList(response.data);
    }).catch(error=>console.log(error));
  },[] )
  

 const filterUserList =(category:string)=>{
  if(category=="all"){setFilterList(currentUserList); return;}
let newList = currentUserList;
 newList = newList.filter(user=>user.role==category);
  setFilterList(newList);
 }

  return (<>
    <div className="page-header">
      <h4 className='page-title' >Users</h4>
    </div>
    <div className="page-content">
    <div className="tabs">
    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
    <Tab  value="all" label="All Users" />
    <Tab value="manager"label="Managers" />
    <Tab value="employee" label="Employees" />
  </Tabs>
  <Button variant="outlined" startIcon={<PersonAddAltRoundedIcon />} size="small" onClick={()=>{navigate("/admin/addEmployee")}} >Add Employee</Button>
      </div>

    <div className="table-container">
      <EmployeeTable userList={filterList} />
    </div>
    </div>
  </>
  )
}

const EmployeeTable =({userList}:{userList:Iuser[]})=>{
  return <>
  <TableContainer >
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
          <TableRow className='table-header'>
            <TableCell  className='table-header-data' >Employee Name</TableCell>
            <TableCell className='table-header-data'  align="right">Email</TableCell>
            <TableCell className='table-header-data'  align="right">Role</TableCell>
            <TableCell  className='table-header-data' align="right">Department</TableCell>
            <TableCell className='table-header-data'  align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {userList.map((user)=>{
          return (
            <TableRow>
              <TableCell>{user.name}</TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="right">{user.role.charAt(0).toUpperCase()}{user.role.slice(1)}</TableCell>
            <TableCell align="right">{user.department.toUpperCase()}</TableCell>
            <TableCell align="right"><Button variant="text">Edit</Button> | <Button variant="text">Delete</Button></TableCell>
            </TableRow>
          )
        })}
        </TableBody>
    </Table>
  </TableContainer>
  </>
}

export default AdminEmployee