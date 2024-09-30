import { FormControl, FormHelperText, Input, InputLabel,  } from '@mui/material'
import { FilledInput } from '@mui/material';
import React from 'react'

const AddEmployee = () => {
  return (<>
    <div className="page-header">
      <h4 className='page-title' >Add Employee</h4>
    </div>
    <div className="page-content" style={{padding:"2rem"}}>
    <FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
  
</FormControl>
<InputLabel htmlFor="my-input">Email address</InputLabel>
  <FilledInput />


      </div>
  </>
  )
}

export default AddEmployee