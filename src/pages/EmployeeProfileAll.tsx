import React, { useEffect } from 'react'
import Axios from '../axios/config';
import { useParams } from 'react-router-dom';
import { ToTitleCase } from '../utils/StringFunction';
import { Paper } from '@mui/material';
import BasicInformation from '../component/employee/BasicInformation';
import ContactInformation from '../component/employee/ContactInformation';
import dayjs from 'dayjs';
import { setTitle } from '../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ManagerHistory from '../component/employee/ManagerHistory';
import { IReviewShow } from '../utils/Interfaces/IReviewer';
import { RootState } from '../redux/store/store';

const EmployeeProfileAll:React.FC = () => {

  const dispatch = useDispatch();
    const {employeeId} =  useParams();
    console.log("emp:",employeeId)
    const [userData, setUserData] = React.useState({});
    const [managerList,setManagerList] = React.useState<IReviewShow[]>([]);
    const loginData =  useSelector((state:RootState)=>state.loginData);
    
    useEffect(()=>{
      Axios.post("/profile/getEmployeeDetails",{userID:employeeId})
      .then((response)=>{
        console.log("response:",response.data)
        setUserData({...response.data,
          dateOfBirth: response.data.dateOfBirth ==null ?null :dayjs(response.data.dateOfBirth)});
          dispatch(setTitle(ToTitleCase(response.data.name)));
        }).catch((error)=>{
          setUserData({
            userId:employeeId,
            name:"",
            designation:"",
            department:"",
            reportingManager:"",
            dateOfBirth:null,
            gender:"",
            email:"",
            phone:"",
            role:"",
            personalEmail:""
          });
        });
        Axios.get(`/reviewer/getReviewHistory?userId=${employeeId}`)
        .then((response)=>{
          console.log("manager History",response.data);
          setManagerList(response.data);
        
        })
        console.log(userData)
      },[])

  return (
    <>
   
    {/* <ContentHeader title={ToTitleCase(userData.name)} /> */}
    <div className="page-content" >
        <Paper elevation={5} style={{width:"100%"}}  > 
        <Paper>
        <Paper variant='outlined' style={{padding:"1rem",display:"flex", justifyContent:"space-between"}}>
        <h3 className='profile-subtitle' >Basic Information</h3>
        
        </Paper>
        <Paper style={{display:"flex",gap:"75px",alignItems:"center",padding:"1rem"}}>
        <BasicInformation profileInfo={userData} />
        </Paper>
        </Paper>

        </Paper>
        <Paper elevation={5}>
        <Paper variant='outlined' style={{padding:"1rem",marginTop:"1rem"}}>
        <h3 className='profile-subtitle'>Contact Information</h3>
        </Paper>
        <Paper style={{display:"flex",gap:"75px",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
          <ContactInformation profileInfo={userData} />
        </Paper>
        </Paper>
        {userData.role !="employee"? <></> : <Paper elevation={5}>
        <Paper variant='outlined' style={{padding:"1rem",marginTop:"1rem"}}>
        <h3 className='profile-subtitle'>Previous Managers</h3>
        </Paper>
        <Paper style={{display:"flex",gap:"75px",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
          <ManagerHistory managerList={managerList} />
        </Paper>
        </Paper>  }
        
      </div>
    </>
  )
}

export default EmployeeProfileAll