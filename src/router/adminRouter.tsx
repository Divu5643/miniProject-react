import { Route } from "react-router-dom";
import React from "react";
import { AdminList } from "../utils/sidebarLists";
import SideBar from "../component/common/Sidebar";
import AdminEmployee from "../pages/admin/AdminEmployee";
import AddEmployee from "../pages/admin/AddEmployee";

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
            <SideBar navItemList={AdminList} ChildComponent={AdminEmployee} />
            
          </div>
        }
      />
      <Route path="/admin/goal" element={<div>
        <SideBar navItemList={AdminList} ChildComponent={()=>{return(<> Goals</>)}} />
        </div>} />
      <Route
        path="/admin/performance"
        element={<div>
            <SideBar navItemList={AdminList} ChildComponent={()=>{return(<>review cycles and employee to review binding</>)}} />
             </div>}
      />
      <Route
        path="/admin/addEmployee"
        element={<div>
            <SideBar navItemList={AdminList} ChildComponent={AddEmployee} />
             </div>}
      />
    </React.Fragment>
  );
};

export default adminRoutes;
