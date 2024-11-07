import { Route } from "react-router-dom";
import React from "react";
import SideBar from "../component/common/Sidebar";
import ReviewerDashboard from "../pages/reviewer/ReviewerDashboard";
import { ReviewerList } from "../utils/sidebarLists";
import ReviewerEmployee from "../pages/reviewer/ReviewerEmployee";
import ReviewerAssesment from "../pages/reviewer/ReviewerAssesment";
import GoalReviewer from "../pages/reviewer/GoalReviewer";
import ManagerAssesment from "../pages/reviewer/ManagerAssesment";
import SpecificEmployeeReviews from "../pages/reviewer/SpecificEmployeeReviews";
import EmployeeProfileAll from "../pages/EmployeeProfileAll";
import ReviewerProfile from "../pages/reviewer/ReviewerProfile";
import ProfileSetting from "../pages/employee/ProfileSetting";
import GoalDetails from "../pages/GoalDetails";

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
      <Route
        path="/manager/review/:employeeId"
        element={
          <SideBar
            navItemList={ReviewerList}
            ChildComponent={SpecificEmployeeReviews}
          />
        }
      />
       <Route
        path="/manager/profile/:employeeId"
        element={
          <SideBar
            navItemList={ReviewerList}
            ChildComponent={EmployeeProfileAll}
          />
        }
      />
      <Route
        path="/manager/Selfprofile"
        element={
          <SideBar
            navItemList={ReviewerList}
            ChildComponent={ReviewerProfile}
          />
        }
      />
        <Route
        path="/manager/profileSettings"
        element={
          <SideBar
            navItemList={ReviewerList}
            ChildComponent={ProfileSetting}
          />
        }
      />
      <Route
        path="/manager/goalDetails/:goalId"
        element={
          <SideBar
            navItemList={ReviewerList}
            ChildComponent={GoalDetails}
          />
        }
      />
    </React.Fragment>
  );
};

export default reviewerRoutes;
