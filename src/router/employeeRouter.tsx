import { Route,Routes } from "react-router-dom"
import React from "react";

const adminRoutes = ()=>{
    
    return(
        <React.Fragment>
        <Route path="/employee" element={<div>Dashboard - track their historical performance data </div>} />
        <Route path="/employee/performance" element={<div>Self-Assessment (Employee)  </div>} />
        <Route path="/employee/goal" element={<div>view their goals, categorized by status (pending, in progress, completed). </div>} />
        <Route path="/employee/profile" element={<div>profile of Employee to edit </div>} />
        </React.Fragment>
    )
}

export default adminRoutes;
