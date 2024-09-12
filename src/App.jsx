import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import ManagerRoutes from "./utils/ManagerRoutes";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import UserDashboardLayout from "./pages/userDashboard/UserDashboardLayout";
import ManagerDashboardLayout from "./pages/managerDashboard/ManagerDashboardLayout";
import ManagerDashboard from "./components/managerDashboardComponents/ManagerDashboard";
import AllEmployees from "./components/managerDashboardComponents/AllEmployees";
import ManagerAttendance from "./components/managerDashboardComponents/ManagerAttendance";
import ApplyForLeave from "./components/ApplyForLeave";
import MyAttandance from "./components/managerDashboardComponents/MyAttandance";
import UserDashboard from "./components/userDashboardComponents/UserDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/manager-dashboard" />} />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoutes>
              <UserDashboardLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="" element={<UserDashboard />} />
          <Route path="attendance" element={<MyAttandance />} />
          <Route path="apply-for-leave" element={<ApplyForLeave />} />
        </Route>
        <Route
          path="/manager-dashboard/*"
          element={
            <ProtectedRoutes>
              <ManagerRoutes>
                <ManagerDashboardLayout />
              </ManagerRoutes>
            </ProtectedRoutes>
          }
        >
          <Route path="" element={<ManagerDashboard />} />
          <Route path="all-employees" element={<AllEmployees />} />
          <Route path="all-attendance" element={<ManagerAttendance />} />
          <Route path="apply-for-leave" element={<ApplyForLeave />} />
          <Route path="attendance" element={<MyAttandance />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </>
  );
}

export default App;
