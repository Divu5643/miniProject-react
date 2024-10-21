import { Route } from "react-router-dom";
import React from "react";
import { AdminList } from "../utils/sidebarLists";
import SideBar from "../component/common/Sidebar";
import AdminEmployee from "../pages/admin/AdminEmployee";
import AddEmployee from "../pages/admin/AddEmployee";
import EditEmployee from "../pages/admin/EditEmployee";
import ReviewCycle from "../pages/admin/ReviewCycle";
import AdminGoals from "../pages/admin/AdminGoals";
import AdminDashboard from "../pages/admin/AdminDashboard";

import EmployeeProfileAll from "../pages/EmployeeProfileAll";
import ProfileSetting from "../pages/employee/ProfileSetting";
import AdminProfile from "../pages/admin/AdminProfile";

const adminRoutes = () => {
  return (
    <React.Fragment>
      <Route
        path="/admin"
        element={
          <SideBar navItemList={AdminList} ChildComponent={AdminDashboard} />
        }
      />
      <Route
        path="/admin/employees"
        element={
          <SideBar navItemList={AdminList} ChildComponent={AdminEmployee} />
        }
      />
      <Route
        path="/admin/goal"
        element={
          <SideBar navItemList={AdminList} ChildComponent={AdminGoals} />
        }
      />
      <Route
        path="/admin/performance"
        element={
          <div>
            <SideBar navItemList={AdminList} ChildComponent={ReviewCycle} />
          </div>
        }
      />
      <Route
        path="/admin/addEmployee"
        element={
          <div>
            <SideBar navItemList={AdminList} ChildComponent={AddEmployee} />
          </div>
        }
      />
      <Route
        path="/admin/EditEmployee"
        element={
          <div>
            <SideBar navItemList={AdminList} ChildComponent={EditEmployee} />
          </div>
        }
      />
       <Route
        path="/admin/profile/:employeeId"
        element={
          <div>
            <SideBar navItemList={AdminList} ChildComponent={EmployeeProfileAll} />
          </div>
        }
      />
      <Route
        path="/admin/selfProfile"
        element={
          <div>
            <SideBar navItemList={AdminList} ChildComponent={AdminProfile} />
          </div>
        }
      />
      <Route
        path="/admin/profileSettings"
        element={
          <div>
            <SideBar navItemList={AdminList} ChildComponent={ProfileSetting} />
          </div>
        }
      />
    </React.Fragment>
  );
};

export default adminRoutes;
