import { Box, Button, Paper, Typography } from '@mui/material'

import React, { useEffect } from 'react'
import BasicInformation from '../../component/employee/BasicInformation'
import ContactInformation from '../../component/employee/ContactInformation'
import { useNavigate } from 'react-router-dom'
import Axios from '../../axios/config'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import IProfile from '../../utils/Interfaces/IProfile'
import dayjs  from 'dayjs';
import ContentHeader from '../../component/common/ContentHeader'
const EmployeeProfile = () => {
  const navigate =  useNavigate();
  const userId =  useSelector((state:RootState)=>state.loginData.userId);
  const [userData,setUserData] = React.useState<IProfile>({});

  useEffect(()=>{
    Axios.post("/profile/getEmployeeDetails",{userID:userId})
    .then((response)=>{
      setUserData({...response.data,
        dateOfBirth: response.data.dateOfBirth ==null ?null :dayjs(response.data.dateOfBirth)});
    }).catch((error)=>{
      setUserData({
        userId:userId,
        name:"NA",
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
      < ContentHeader title='Profile' />
      <div className="page-content" >
        <Paper elevation={5} style={{width:"100%"}}  > 
        <Paper>
        <Paper variant='outlined' style={{padding:"1rem",display:"flex", justifyContent:"space-between"}}>
        <h3 className='profile-subtitle' >Basic Information</h3>
        <Button onClick={()=>{navigate("/employee/profileSettings",{ state: { profileInfo:userData } })}}>Edit Profile</Button>
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

export default EmployeeProfile