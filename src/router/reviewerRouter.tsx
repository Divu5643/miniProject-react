import { Route, Routes } from "react-router-dom";
import React from "react";
import SideBar from "../component/common/Sidebar";
import ReviewerDashboard from "../pages/reviewer/ReviewerDashboard";
import { ReviewerList } from "../utils/sidebarLists";
import ReviewerEmployee from "../pages/reviewer/ReviewerEmployee";
import ReviewerGoal from "../pages/reviewer/ReviewerGoal";
import ReviewerAssesment from "../pages/reviewer/ReviewerAssesment";
import GoalReviewer from "../pages/reviewer/GoalReviewer";
import ManagerAssesment from "../pages/reviewer/ManagerAssesment";

const reviewerRoutes = () => {
  return (
    <React.Fragment>
      <Route
        path="/manager"
        element={
          <SideBar
            navItemList={ReviewerList}
            ChildComponent={ReviewerDashboard}
          />
        }
      />
      <Route
        path="/manager/employees"
        element={
          <SideBar
            navItemList={ReviewerList}
            ChildComponent={ReviewerEmployee}
          />
        }
      />
      <Route
        path="/manager/goal"
        element={
          <SideBar navItemList={ReviewerList} ChildComponent={GoalReviewer} />
        }
      />
      <Route
        path="/manager/performance"
        element={
          <SideBar
            navItemList={ReviewerList}
            ChildComponent={ReviewerAssesment}
          />
          
        }
      />
       <Route
        path="/manager/employeeAssesment/:employeeId"
        element={
          <SideBar
            navItemList={ReviewerList}
            ChildComponent={ManagerAssesment}
          />
          
        }
      />
    </React.Fragment>
  );
};

export default reviewerRoutes;
