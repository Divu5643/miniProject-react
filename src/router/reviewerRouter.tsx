import { Route,Routes } from "react-router-dom"
import React from "react";

const reviewerRoutes = ()=>{
    
    return(
        <React.Fragment>
        <Route path="/reviewer" element={<div>Dashboard - Charts And stuff for all employee </div>} />
        <Route path="/reviewer/employees" element={<div>Employees - All Employee under the  Manager  </div>} />
        <Route path="/admin/goal" element={<div>Goals set goals for employees under me </div>} />
        <Route path="/admin/performance" element={<div>Assesment form for the employees under him </div>} />
        </React.Fragment>
    )
}

export default reviewerRoutes;
