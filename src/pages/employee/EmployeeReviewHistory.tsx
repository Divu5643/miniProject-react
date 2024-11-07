import { Button, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material'
import React, { useEffect } from 'react'
import Axios from '../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { IPerfomanceData } from '../../utils/Interfaces/IAssesnment';
import { printDate } from '../../utils/StringFunction';
import NoData from '../../component/common/NoData';
import CommonSnackbar from '../../component/common/CommonSnackbar';
let permanentList:IPerfomanceData[] = [];
const EmployeeReviews:React.FC = ()=>{
// For SnackBar
  const [open, setOpen] = React.useState({ open: false, message: "" });
  const closeSnackbar = () => setOpen({ open: false, message: "" });
  const openSnackBar = (message: string) =>
    setOpen({ open: true, message: message });

    const userId =  useSelector((state:RootState)=>state.loginData.userId);
    const [performanceList , setPerformanceList] = React.useState<IPerfomanceData[]>([]);
    const [tabValue,setTabValue] =React.useState("self");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setTabValue(newValue);
    };

    useEffect(()=>{
  
      Axios.post("/performance/getPerformanceForEmployee",{userID:userId}).then((result)=>{
        let tempData : IPerfomanceData[]=[];
        result.data.map((performance:any)=>{
          let tempPerformance :IPerfomanceData = {
            performanceId: performance.performanceId,
            reviewDate: performance.createdDate,
            technicalSkill: performance.technicalSkill,
            softSkill: performance.softSkill,
            teamworkSkill: performance.teamwork,
            deliveryTime: performance.deliveryTime,
            remark: performance.remark,
            userId: performance.userId,
            createdBy: performance.createdBy
          }
          tempData.push(tempPerformance);
        })
        permanentList=tempData;
        setPerformanceList(tempData);
      }).catch(err=>{
        openSnackBar(err.message);
      })
  
    },[])

    useEffect(()=>{
      
      let newList =[]
      if(tabValue =="manager"){
         newList = permanentList.filter((review:IPerfomanceData)=>{
          return review.userId != review.createdBy
        })
      }else{
        newList  = permanentList.filter((review:IPerfomanceData)=>{
          return review.userId == review.createdBy
        })
      }
      setPerformanceList(newList)
    },[tabValue])


    return (
      <div style={{marginTop:"10px"}} >
         <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab value="self" label="Self Reviews" />
            <Tab value="manager" label="Manager Reviews" />
          </Tabs>
        {performanceList.length==0 ? <NoData/> : 
        
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
                <TableCell align="left" className="table-cell" >{printDate(reviewDate)}</TableCell>
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
        }
         <CommonSnackbar open={open} closeSnackbar={closeSnackbar} />
          </div>
    )
  }
  export default EmployeeReviews