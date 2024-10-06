import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import IshowGoal from '../../utils/Interfaces/IGoals';

const EmployeeGoals = () => {

    const [goalList,setGoalList] = React.useState<IshowGoal[]>([]);

    useEffect(() => {},[])

  return (
    <>
    <div className='page-header'>
    <h4 className="page-title">Goals</h4>
    </div>
    <div className="page-content">
    <Paper elevation={6} >
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='table-header'>
          <TableRow>
          <TableCell className='table-header-data'  align='left' >Goal Outcome</TableCell>
            <TableCell className='table-header-data'  align='left' >Completion Date</TableCell>
            <TableCell className='table-header-data'  align='left' >Status</TableCell>
            <TableCell className='table-header-data'  align='left' >Assigend By</TableCell>
            <TableCell className='table-header-data' align='center' >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {goalList.map((goal)=>{
            var completionDate =  new Date(goal.completionDate.toString());
            return(
                <TableRow>
                    <TableCell>{goal.goalOutcome}</TableCell>
                    <TableCell>{completionDate.toLocaleDateString()}</TableCell>
                    <TableCell>{goal.status}</TableCell>
                    <TableCell>{goal.assignerName}</TableCell>
                    { (goal.status=="pending") && 
                     <TableCell>
                     <button>Mark as In Progress</button>
                 </TableCell>   
                    }
                </TableRow>
            )
        })}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </div>
    </>
  )
}

export default EmployeeGoals