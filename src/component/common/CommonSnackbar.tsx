import { IconButton, Snackbar } from '@mui/material'
import React from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const CommonSnackbar:React.FC<{open:React.ComponentState,closeSnackbar:any}> = ({open,closeSnackbar}) => {
  // const [open, setOpen] = React.useState({ open: false, message: "" });
  // const closeSnackbar = () => setOpen({ open: false, message: "" });
  // const openSnackBar = (message: string) =>
  //   setOpen({ open: true, message: message });


  return (
    
    <Snackbar
    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    sx={{ maxWidth: "250px",zIndex:9999999 }}
    open={open.open}
    autoHideDuration={4000}
    onClose={closeSnackbar}
    message={open.message}
    action={
      <>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={closeSnackbar}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </>
    }
  />
  )
}

export default CommonSnackbar
