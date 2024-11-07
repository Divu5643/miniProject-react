import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
  } from "@mui/material";
  import Modal from '@mui/material/Modal';
  import React, { useEffect } from "react";
  import Axios from "../../axios/config";
  import { IDepartment, IDesignation } from "../../utils/Interfaces/IDepartment";
  import { ToTitleCase } from "../../utils/StringFunction";
import DeleteModal from "../../component/common/DeleteModal";
  
  const DesignationPage = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [deleteModalOpen,setDeleteModalOpen] =  React.useState({open:false,userId:0});
    const handleDeleleteModalOpen =(deptId:number)=>{ setDeleteModalOpen({open:true,userId:deptId});}
    const handleDeleleteModalClose =()=>{setDeleteModalOpen({open:false,userId:0});}
    const [designation,setDesignation] =  React.useState("");

    const [designationList, setDesignationList] = React.useState<IDesignation[]>([]);

    useEffect(() => {
      Axios.get("/designation/getAllDesignation").then((response) => {
        setDesignationList(response.data);
     
      });
    }, []);
  const AddDesignation =()=>{
    Axios.put("/designation/AddDesignation",{designation}).then((response)=>{
        let count =  designationList[designationList.length - 1].designationId;
        let newList =  [...designationList,{designation,designationId:count+1}];
        setDesignationList(newList);
        setDesignation("");
        handleClose();
    }).catch((err)=>{console.log(err.message);})
  }

  const handleDeleteDesignation =(designationId:number)=>{
    Axios.put("designation/DeleteDesignation",{userID:designationId})
    .then((response)=>{
        handleDeleleteModalClose();
        let newList = designationList.filter((desg)=>{
            return desg.designationId!==designationId;
        })

        setDesignationList(newList);
    })
    console.log("deleteDesignation");
}


    return (
        <>
      <div className="page-content">
          <div className="add-Button" style={{padding:"1rem",float:"right"}}>
  
          <Button variant="outlined" onClick={()=>{handleOpen()}} >Add Designation</Button>
          </div>
        <div className="department-table">
          <TableContainer>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-header">
                  <TableCell className="table-header-data">
                    Department ID{" "}
                  </TableCell>
                  <TableCell className="table-header-data">Designation</TableCell>
                  <TableCell className="table-header-data">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {designationList.map((dept: IDesignation) => {
                    return (
                    <TableRow key={dept.designationId}>
                      <TableCell className="table-data">{dept.designationId}</TableCell>
                      <TableCell className="table-data">
                        {ToTitleCase(dept.designation)}
                      </TableCell>
                      <TableCell className="table-data">
                        <Button color="error" onClick={()=>{handleDeleleteModalOpen(dept.designationId)}}  >Delete</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Modal
         open={open}
         onClose={handleClose}
        aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
            >
            {/* <div className="addModal" > */}
            <Paper elevation={6} className="addModal" > 
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Designation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           <TextField 
           fullWidth
           label="Designation"
           value={designation}
           onChange={(event)=>{
                setDesignation(event.target.value);
           }}
           />
          </Typography>
          <div style={{display:"flex",marginTop:"1rem",justifyContent:"flex-end", gap:"20px"}}>
            <Button variant="contained" onClick={AddDesignation} >Save</Button>
            <Button variant="contained"color="error" onClick={handleClose}  >Cancel</Button>
          </div>
          </Paper>
            {/* </div> */}

            </Modal>
            <DeleteModal  
             open ={deleteModalOpen}
             handleClose={handleDeleleteModalClose}
             handleDelete={handleDeleteDesignation}
            />
                </>
    );
  };
  
  export default DesignationPage;
  