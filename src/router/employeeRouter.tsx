import { Route, Routes } from "react-router-dom";
import React from "react";
import SideBar from "../component/common/Sidebar";
import { EmployeeList } from "../utils/sidebarLists";

const employeeRoutes = () => {
  return (
    <React.Fragment>
      <Route
        path="/employee"
        element={
          <div>
            <SideBar navItemList={EmployeeList}  ChildComponent={()=>{return(<>Dashboard Employee - Charts And stuff for all employee</>)}} />
            
          </div>
        }
      />
      <Route
        path="/employee/performance"
        element={<div>Self-Assessment (Employee) </div>}
      />
      <Route
        path="/employee/goal"
        element={
          <div>
            view their goals, categorized by status (pending, in progress,
            completed).{" "}
          </div>
        }
      />
      <Route
        path="/employee/profile"
        element={<div>profile of Employee to edit </div>}
      />
    </React.Fragment>
  );
};

export default employeeRoutes;
