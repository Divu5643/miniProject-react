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

const adminRoutes = () => {
  return (
    <React.Fragment>
      <Route
        path="/admin"
        element={
          <div>
            <SideBar navItemList={AdminList}  ChildComponent={AdminDashboard} />
            
          </div>
        }
      />
      <Route
        path="/admin/employees"
        element={
          <div>
            <SideBar navItemList={AdminList} ChildComponent={AdminEmployee} />
            
          </div>
        }
      />
      <Route path="/admin/goal" element={<div>
        <SideBar navItemList={AdminList} ChildComponent={AdminGoals} />
        </div>} />
      <Route
        path="/admin/performance"
        element={<div>
            <SideBar navItemList={AdminList} ChildComponent={ReviewCycle} />
             </div>}
      />
      <Route
        path="/admin/addEmployee"
        element={<div>
            <SideBar navItemList={AdminList} ChildComponent={AddEmployee} />
             </div>}
      />
      <Route
        path="/admin/EditEmployee"
        element={<div>
            <SideBar navItemList={AdminList} ChildComponent={EditEmployee} />
             </div>}
      />
    </React.Fragment>
  );
};

export default adminRoutes;
