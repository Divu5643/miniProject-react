import { useState } from 'react'
import './App.css'
import Sidebar from './component/common/olderSidebar12'
import { BrowserRouter, Routes,Route } from'react-router-dom'
import AdminDashboard from './pages/admin/AdminDashboard'
import adminRoutes from './router/adminRouter'
import reviewerRoutes from './router/reviewerRouter'
import employeeRoutes from './router/employeeRouter'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
      {adminRoutes()}
      {reviewerRoutes()}
      {employeeRoutes()}
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
