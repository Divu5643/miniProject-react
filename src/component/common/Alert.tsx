import { Collapse, IconButton } from '@mui/material';
import React from 'react'
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert:React.FC<{open:boolean,message:string,handleClose:Function}> = ({open=false,message="",handleClose}) => {
  return (
    <Collapse in={open}>
    <Alert
     severity="error"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ xs:2,md:8 }}
    >
      {message}
    </Alert>
  </Collapse>
  )
}

export default CustomAlert