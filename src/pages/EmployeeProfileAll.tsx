import React, { useEffect } from 'react'
import Axios from '../axios/config';
import { useParams } from 'react-router-dom';
import { ToTitleCase } from '../utils/StringFunction';
import { Paper } from '@mui/material';
import BasicInformation from '../component/employee/BasicInformation';
import ContactInformation from '../component/employee/ContactInformation';
import dayjs from 'dayjs';
import ContentHeader from '../component/common/ContentHeader';

const EmployeeProfileAll = () => {

    const {employeeId} =  useParams();
    console.log("emp:",employeeId)
    const [userData, setUserData] = React.useState({});

    useEffect(()=>{
        Axios.post("/profile/getEmployeeDetails",{userID:employeeId})
        .then((response)=>{
            console.log("response:",response.data)
            setUserData({...response.data,
              dateOfBirth: response.data.dateOfBirth ==null ?null :dayjs(response.data.dateOfBirth)});
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
            personalEmail:""
          });
        });
      },[])

  return (
    <>
   
    <ContentHeader title={ToTitleCase(userData.name)} />
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
      </div>
    </>
  )
}

export default EmployeeProfileAll