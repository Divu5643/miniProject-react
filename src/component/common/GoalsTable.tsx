import {
  Button,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import IshowGoal from "../../utils/Interfaces/IGoals";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { ModalClose } from "@mui/joy";
import Axios from "../../axios/config";
import { printDate, ToTitleCase } from "../../utils/StringFunction";
import { Delete } from "@mui/icons-material";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const GoalsTable = ({
  goalList,
  setGoalList,
  openSnackBar,
  permanaentGoalList,
  setPermanaentGoalList,
  totalCount,
  filterAndSearch,
  setFilterAndSearch
}: {
  goalList: IshowGoal[];
  setGoalList: React.Dispatch<React.SetStateAction<IshowGoal[]>>;
  openSnackBar: Function;
  permanaentGoalList:IshowGoal[];
  setPermanaentGoalList:Function;
  totalCount:number,
   filterAndSearch:any,
  setFilterAndSearch:any
}) => {
  const [open, setOpen] = React.useState({
    open: false,
    id: 0,
    status: "",
  });

  const navigate = useNavigate();
  const loginData = useSelector((state:RootState)=>state.loginData);
// For Modal
const [openModal, setOpenModal] = React.useState({open:false,userId:0});
const handleOpenModal = (userId:number) => setOpenModal({open:true,userId});
const handleCloseModal = () => setOpenModal({open:false,userId:0});


  const handleEdit = (newStatus: string, userId: Number) => {
    Axios.put("/goal/editGoal", { status: newStatus, userId: userId })
      .then((response) => {
        setOpen({ open: false, id: 0, status: "" });
        let newList: IshowGoal[] = goalList.map((goal) => {
          if (goal.goalId == userId) {
            goal.status = newStatus;
          }
          return goal;
        });
        setGoalList(newList);

      })
      .catch((error) => {

      });
  };
  const handleDelete = (goalId: Number) => {
    Axios.put(`goal/deleteGoal/?id=${goalId}`)
      .then((response) => {
        let newList = goalList.filter((goal) => {
          return goal.goalId !== goalId;
        });
        openSnackBar("Goal deleted");
        handleCloseModal();
        setPermanaentGoalList([...newList]);
        setGoalList([...newList]);
      })
      .catch((error) => {
        handleCloseModal();
        openSnackBar(error.message);
      });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setFilterAndSearch({...filterAndSearch,PageNumber: newPage});
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
  
    setFilterAndSearch({...filterAndSearch,
       RowCount: parseInt(event.target.value, 10),
       PageNumber:0});

  };



  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow className="table-header">
              <TableCell className="table-header-data" align="left">
                Employee Name
              </TableCell>
              <TableCell className="table-header-data" align="left">
                Goal Outcome
              </TableCell>
              <TableCell className="table-header-data" align="left">
                Completion Date
              </TableCell>
              <TableCell className="table-header-data" align="left">
                Status
              </TableCell>
              <TableCell className="table-header-data" align="left">
                Assigend By
              </TableCell>
              <TableCell className="table-header-data" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {goalList.map((goal: IshowGoal) => {
              var completionDate = new Date(goal.completionDate.toString());
              return (
                <TableRow key={goal.goalId}>
                  <TableCell align="left" className="table-cell">
                    {ToTitleCase(goal.employeeName)}
                    
                  </TableCell>
                  <TableCell
                    align="left"
                    className="table-cell"
                    sx={{ wordBreak: "break-word", maxWidth: "170px" }}
                  >
                    {ToTitleCase(goal.goalOutcome)}
                    
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    {printDate(completionDate)}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                    
                    {ToTitleCase(goal.status)}
                  </TableCell>
                  <TableCell align="left" className="table-cell">
                  {ToTitleCase(goal.assignerName)}
                    
                  </TableCell>
                  <TableCell align="center" className="table-cell">
                  <Button onClick={()=>{
                    navigate(`/${loginData.role}/goalDetails/${goal.goalId}`,{state:goal})
                  }} >
                      Details
                    </Button>

                  </TableCell>
                </TableRow>
              );
            })}
             <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                colSpan={5}
                count={totalCount}
                rowsPerPage={filterAndSearch.RowCount}
                page={filterAndSearch.PageNumber}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModal
      open={openModal}
      handleClose={handleCloseModal}
      handleDelete={handleDelete}

       />
      <Modal
        open={open.open}
        onClose={() => setOpen({ open: false, id: 0, status: "" })}
      >
        <ModalDialog
          color="neutral"
          layout="center"
          size="lg"
          variant="outlined"
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography>Set Status</Typography>
          <div style={{ padding: "2rem" }}>
            <TextField
              fullWidth={true}
              select={true}
              value={open.status}
              onChange={(event) => {
                setOpen({ ...open, status: event.target.value });
              }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In-Progress</MenuItem>
              <MenuItem value="complete">Complete</MenuItem>
            </TextField>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                handleEdit(open.status, open.id);
              }}
            >
              Save
            </Button>
          </div>
        </ModalDialog>
      </Modal>

    </>
  );
};

export default GoalsTable;
