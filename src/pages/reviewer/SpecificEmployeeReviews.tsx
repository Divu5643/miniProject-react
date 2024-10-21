import React, { useEffect } from 'react'
import { IPerfomanceData } from '../../utils/Interfaces/IAssesnment';
import { useParams } from 'react-router-dom';
import Axios from '../../axios/config';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { printDate } from '../../utils/StringFunction';
import CommonSnackbar from '../../component/common/CommonSnackbar';

const SpecificEmployeeReviews = () => {
    const [performanceList , setPerformanceList] = React.useState<IPerfomanceData[]>([]);
    const {employeeId} =  useParams();

    const [open, setOpen] = React.useState({ open: false, message: "" });
    const closeSnackbar = () => setOpen({ open: false, message: "" });
    const openSnackBar = (message: string) =>
      setOpen({ open: true, message: message });

    useEffect(()=>{
  
        Axios.post("/performance/getPerformanceForEmployee",{userID:employeeId}).then((result)=>{
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
        }).catch((error=>{
      openSnackBar(error.message);
          
        }))
    
      },[])
  const handleDelete= (performanceId: Number)=>{
    Axios.post("performance/deletePerformance",{userID:performanceId},).then((result)=>{
     
      var newList = performanceList.filter((performance)=>performance.performanceId!==performanceId)
      setPerformanceList(newList);
      openSnackBar("Performance deleted")
    }).catch((error)=>{

      openSnackBar("Cannot Delete Performance: " + error.message);
    })
  }
  return (
    <>
    <div className="page-header">
    <h1 className="page-title">Employee Review</h1>
  </div>
  <div className="page-content">
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
              <TableCell   className="table-header-data" >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {performanceList.map((data:IPerfomanceData)=>{
            const reviewDate =  new Date(data.reviewDate.toString());
            return (
              <TableRow key={data.performanceId}>
                <TableCell align="left" className="table-cell" >{printDate(reviewDate)}</TableCell>
                <TableCell align="left" className="table-cell" >{`${data.technicalSkill}`}</TableCell>
                <TableCell align="left" className="table-cell" >{`${data.softSkill}`}</TableCell>
                <TableCell align="left" className="table-cell" >{`${data.teamworkSkill}`}</TableCell>
                <TableCell align="left" className="table-cell" >{`${data.deliveryTime}`}</TableCell>
                <TableCell align="left" className="table-cell" >{data.remark}</TableCell>
                <TableCell align="left" className="table-cell" >
                <Button color='error' onClick={()=>{handleDelete(data.performanceId)} } >Delete</Button>
                </TableCell>
              </TableRow>
            )
          })}
          </TableBody>
          </Table>
          </TableContainer >    
  </div>
  <CommonSnackbar open={open.open} closeSnackbar={closeSnackbar}  />
    </>
  )
}

export default SpecificEmployeeReviews