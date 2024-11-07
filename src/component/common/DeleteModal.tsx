import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
};

const DeleteModal:React.FC<{
  open: {open:boolean,userId:number};
  handleClose: Function;
  handleDelete:Function
}> = ({
  open,
  handleClose,
  handleDelete
} ) => {
  return (
    <Modal
      open={open.open}
      onClose={handleClose}     
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="logo-cont" style={{textAlign:"center"}}>

            <WarningAmberRoundedIcon style={{ color: "#ed6c02", fontSize:"4rem" }} />
        </div>
        <Typography color="warning"align="center" id="modal-modal-title" variant="h5" component="h2">
          Warning! Record will be deleted
        </Typography>
        <Typography
          id="modal-modal-description"
          variant="subtitle1"
          sx={{ mt: 1, textAlign: "center" }}
        >
          Are you sure you want to Delete the Record?
        </Typography>
        <div
          className="modal-footer"
          style={{ display: "flex",justifyContent:"center", gap: "25px", marginTop: "15px" }}
        >
          <Button variant="contained" onClick={()=>{handleDelete(open.userId)}} >Delete</Button>
          <Button variant="contained" color="error" onClick={()=>{handleClose()}}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
