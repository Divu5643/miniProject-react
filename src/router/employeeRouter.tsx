import { Route, Routes } from "react-router-dom";
import React from "react";
import SideBar from "../component/common/Sidebar";
import { EmployeeList } from "../utils/sidebarLists";
import EmployeeProfile from "../pages/employee/EmployeeProfile";
import EmployeeGoals from "../pages/employee/EmployeeGoals";
import EmployeeSelfAssesment from "../pages/employee/EmployeeSelfAssesment";
import ProfileSetting from "../pages/employee/ProfileSetting";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";

const employeeRoutes = () => {
  return (
    <React.Fragment>
      <Route
        path="/employee"
        element={
          <div>
            <SideBar navItemList={EmployeeList}  ChildComponent={EmployeeDashboard} />
            
          </div>
        }
      />
      <Route
        path="/employee/selfAssesment"
        element={<SideBar navItemList={EmployeeList}  ChildComponent={EmployeeSelfAssesment} />}

      />
      <Route
        path="/employee/goal"
        element={<SideBar navItemList={EmployeeList}  ChildComponent={EmployeeGoals} />}
      />
      <Route
        path="/employee/selfProfile"
        element={<SideBar navItemList={EmployeeList}  ChildComponent={EmployeeProfile} />}
      />
      <Route
        path="/employee/profileSettings"
        element={<SideBar navItemList={EmployeeList}  ChildComponent={ProfileSetting} />}
      />
    </React.Fragment>
  );
};

export default employeeRoutes;
