import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

const AddReviewModal = ({open, setOpen}:any) => {
    const handleClose = () => setOpen(false)
  return (
    <Modal
         open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={{position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:3,
  border: '2px solid grey',
  boxShadow: 24,
  p: 4,}}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Add a Reviewer
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
  </Box>
    </Modal>
  )
}

export default AddReviewModal