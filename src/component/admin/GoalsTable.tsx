import { Button, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import IshowGoal from '../../utils/Interfaces/IGoals'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { ModalClose } from '@mui/joy';
import Axios from '../../axios/config';


const GoalsTable = ({goalList,setGoalList,openSnackBar}:{goalList:IshowGoal[],setGoalList:React.Dispatch<React.SetStateAction<IshowGoal[]>>,openSnackBar:Function}) => {
  

  const [open, setOpen] = React.useState({
    open:false,
    id:0,
    status:""
  });
  const handleEdit = (newStatus:string,userId:Number)=>{
Axios.put("/goal/editGoal",{status:newStatus,userId:userId}).then((response)=>{
  setOpen({open:false,id:0,status:""});
  let newList :IshowGoal[] = goalList.map((goal)=>{if(goal.goalId==userId){goal.status=newStatus} return goal; })  
    setGoalList(newList);
  
  console.log(response);
}).catch((error)=>{
  console.log(error);
});

  }
  const handleDelete = (goalId:Number)=>{
    Axios.put(`goal/deleteGoal/?id=${goalId}`).then((response)=>{
      let newList  =  goalList.filter((goal)=>{return goal.goalId !== goalId});
      console.log("newList",newList);
      openSnackBar("Goal deleted");
      setGoalList([...newList]);
    }).catch((error)=>{
      openSnackBar(error.message);
    });
  }
  return (
    <>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow className="table-header">
            <TableCell  className='table-header-data' align='left'>Employee Name</TableCell>
            <TableCell className='table-header-data'  align='left' >Goal Outcome</TableCell>
            <TableCell className='table-header-data'  align='left' >Completion Date</TableCell>
            <TableCell className='table-header-data'  align='left' >Status</TableCell>
            <TableCell className='table-header-data'  align='left' >Assigend By</TableCell>
            <TableCell className='table-header-data' align='center' >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goalList.length==0 && "No Goals Available" }
            {goalList.map((goal:IshowGoal) =>{
              var completionDate =  new Date(goal.completionDate.toString());
                return (
                    <TableRow key={goal.goalId}>
                        <TableCell align='left' className='table-cell' >{goal.employeeName}</TableCell>
                        <TableCell align='left' className='table-cell' sx={{wordBreak:"break-word", maxWidth:"170px"}} >{goal.goalOutcome}</TableCell>
                        <TableCell align='left' className='table-cell' >{completionDate.toLocaleDateString()}</TableCell>
                        <TableCell align='left'  className='table-cell' >{goal.status} </TableCell>
                        <TableCell align='left' className='table-cell' >{goal.assignerName}</TableCell>
                        <TableCell align='left' className='table-cell' >
                          <Button onClick={()=>{setOpen({open:true,id:goal.goalId,status:goal.status})}} >Edit</Button>|
                          <Button color='error' onClick={()=>{handleDelete(goal.goalId)}}  >Delete</Button>
                        </TableCell>
                    </TableRow>
                )

            })}
            </TableBody>
        </Table>
        </TableContainer>
        <Modal  open={open.open}
        onClose={() => setOpen({open:false,id:0,status:""})} >
  <ModalDialog
    color="neutral"
    layout="center"
    size="lg"
    variant="outlined"
  >
    <ModalClose variant="plain" sx={{ m: 1 }} />
    <Typography>Set Status</Typography>
    <div style={{padding:"2rem"}} ><TextField fullWidth={true} select={true} value={open.status} onChange={(event)=>{setOpen({...open,status:event.target.value})}}   >
    <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In-Progress</MenuItem>
            <MenuItem value="complete">Completed</MenuItem>
            </TextField>
    </div>
    <div>
      <Button variant='contained' onClick={()=>{handleEdit(open.status,open.id)}} >Save</Button>
    </div>
  </ModalDialog>
</Modal>
    </>
  )
}

export default GoalsTable