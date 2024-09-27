import { Route, Routes } from "react-router-dom";
import React from "react";
import { AdminList } from "../utils/sidebarLists";
import SideBar from "../component/common/Sidebar";

const adminRoutes = () => {
  return (
    <React.Fragment>
      <Route
        path="/admin"
        element={
          <div>
            <SideBar navItemList={AdminList}  ChildComponent={()=>{return(<>Dashboard - Charts And stuff for all employee</>)}} />
            
          </div>
        }
      />
      <Route
        path="/admin/employees"
        element={
          <div>
            <SideBar navItemList={AdminList} />
            Employees - All Employee detials and their Managers{" "}
          </div>
        }
      />
      <Route path="/admin/goal" element={<div>
        <SideBar navItemList={AdminList} />
        Goals </div>} />
      <Route
        path="/admin/performance"
        element={<div>
            <SideBar navItemList={AdminList} />
            review cycles and employee to review binding </div>}
      />
    </React.Fragment>
  );
};

export default adminRoutes;
