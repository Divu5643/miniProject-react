import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import "../../assets/css/ErrorPage.css"
import Errorsvg from "../../assets/Error.svg"
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const ErrorPage:React.FC = () => {

    const isAuthenticated = useSelector((state:RootState) =>state.isAuthenticated);
    const role = useSelector((state:RootState)=>state.loginData.role)
    const navigate =  useNavigate();
  return (
    <>
    {/* <div style={{display:"flex",justifyContent:"center"}}>
    <h1 className='very-large-heading'>404</h1>
    </div>
    <div className="page-content">
        {isAuthenticated ? <h4>OOPS! The Page You are looking is restriced or does not exist. </h4>:<h4>OOPS! The page You are looking for is restricted Please Login! </h4>}
        
    </div> */}
    <main>
  <div className="container">
    <div className="row" style={{display:'flex',alignItems:"center"}}>
      <div style={{minWidth:"50%"}} >
       <img src={Errorsvg} alt=""/>
      </div>
      <div className="col-md-6 align-self-center">
        <h1 className='very-large-heading'>OOPs!</h1>
        <h2 className='error-subtitle' >UH OH! You're lost.</h2>
        <p className="error-body" > 
        {isAuthenticated ? 
        <>
        The Page You are looking is restriced or does not exist. <br/>
        you can click the button below to go back to the homepage.
        </>:
       <> <span>The page You are looking for is restricted Please Login!</span> <br/>
       Click the below button to Login.
       </>}
          
        </p>
        <div className="error-btn">
            {isAuthenticated ? 
            <Button variant='contained'sx={{  fontSize:" 1rem!important"}} onClick={()=>navigate(`/${role}`)}  fullWidth >Home</Button>:
            <Button variant='contained'sx={{  fontSize:" 1rem!important"}} onClick={()=>navigate(`/`)}  fullWidth >Login</Button>}
        
        </div>
      </div>
    </div>
  </div>
</main>
    
    </>
  )
}

export default ErrorPage