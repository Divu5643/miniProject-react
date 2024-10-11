import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import adminRoutes from "./router/adminRouter";
import reviewerRoutes from "./router/reviewerRouter";
import employeeRoutes from "./router/employeeRouter";
import LoginPage from "./pages/login/LoginPage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";
import ErrorPage from "./pages/login/ErrorPage";

function App() {
  const CheckAuth = (role: string) => {
    let isAuthenticated = useSelector(
      (state: RootState) => state.isAuthenticated
    );
    let loggedInRole = useSelector((state: RootState) => state.loginData.role);

    if (!isAuthenticated || loggedInRole != role) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {CheckAuth("admin") && adminRoutes()}
          {CheckAuth("manager") && reviewerRoutes()}
          {CheckAuth("employee") && employeeRoutes()}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
