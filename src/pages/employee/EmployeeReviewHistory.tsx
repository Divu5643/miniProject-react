import { Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material'
import React, { useEffect } from 'react'
import Axios from '../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { IPerfomanceData } from '../../utils/Interfaces/IAssesnment';

const EmployeeReviews = ()=>{
    const userId =  useSelector((state:RootState)=>state.loginData.userId);
    const [performanceList , setPerformanceList] = React.useState<IPerfomanceData[]>([]);
  
    useEffect(()=>{
  
      Axios.post("/performance/getPerformanceForEmployee",{userID:userId}).then((result)=>{
        let tempData : IPerfomanceData[]=[];
        result.data.map((performance)=>{
          let tempPerformance :IPerfomanceData = {
            performanceId:performance.performanceId,
            reviewDate: performance.createdDate,
            technicalSkill: performance.technicalSkill,
            softSkill: performance.softSkill,
            teamworkSkill: performance.teamwork,
            deliveryTime: performance.deliveryTime,
            remark: performance.remark
          }
          tempData.push(tempPerformance);
        })
        setPerformanceList(tempData);
      })
  
    },[])
    return (
      <div style={{marginTop:"10px"}} >
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="table-header" >
              <TableCell  className="table-header-data" >Review Date</TableCell>
              <TableCell   className="table-header-data" >Technical Skill</TableCell>
              <TableCell  className="table-header-data" >Soft Skill</TableCell>
              <TableCell   className="table-header-data" >Teamwork</TableCell>
              <TableCell   className="table-header-data" >Delivery Time</TableCell>
              <TableCell   className="table-header-data" >Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {performanceList.map((data:IPerfomanceData)=>{
            const reviewDate =  new Date(data.reviewDate.toString());
            return (
              <TableRow key={data.performanceId}>
                <TableCell align="left" className="table-cell" >{reviewDate.toLocaleDateString()}</TableCell>
                <TableCell align="left" className="table-cell" >{`${data.technicalSkill}`}</TableCell>
                <TableCell align="left" className="table-cell" >{`${data.softSkill}`}</TableCell>
                <TableCell align="left" className="table-cell" >{`${data.teamworkSkill}`}</TableCell>
                <TableCell align="left" className="table-cell" >{`${data.deliveryTime}`}</TableCell>
                <TableCell align="left" className="table-cell" >{data.remark}</TableCell>
              </TableRow>
            )
          })}
          </TableBody>
          </Table>
          </TableContainer >    
          </div>
    )
  }
  export default EmployeeReviews