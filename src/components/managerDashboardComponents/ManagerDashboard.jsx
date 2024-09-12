import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../features/employee/employeeSlice";
import useAxios from "../../utils/useAxios";
import { useAuthContext } from "../../context/AuthContext";
import Clock from "../Clock";
import ChechInButton from "../ChechInButton";
import { fetchTodaysAttendance } from "../../features/todaysAttendance/todaysAttendanceSlice";
import CheckOutButton from "../CheckOutButton";
import { formatDate } from "../../utils/helperFunctions";
import LeaveApplications from "./LeaveApplications";
import RequiredCheckIn from "./RequiredCheckIn";

function ManagerDashboard() {
  const { user } = useAuthContext();
  const api = useAxios();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const todaysAttendance = useSelector((state) => {
    return state.todaysAttendance.todaysAttendance;
  });

  useEffect(() => {
    dispatch(fetchEmployees(api));
  }, []);
  useEffect(() => {
    const date = new Date();
    dispatch(fetchTodaysAttendance({ api, date, id: user._id }));
  }, []);
  useEffect(() => {
    const fetchCheckedInStatus = async () => {
      try {
        const date = new Date();
        const response = await api.get(`v1/attendance/has-checked-in/${date}`);
        setHasCheckedIn(response.data.checkedIn);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCheckedInStatus();
  }, []);
  useEffect(() => {
    const fetchCheckedOutStatus = async () => {
      try {
        const date = new Date();
        const response = await api.get(`v1/attendance/has-checked-out/${date}`);
        setHasCheckedOut(response.data.checkedOut);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCheckedOutStatus();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <RequiredCheckIn />
      </div>
      <div className="container text-center">
        <div className="card bg-warning ms-auto me-auto mt-5 vstack gap-3">
          <h2>Welcome: {user.fullName}</h2>
          <h2>Total Employees: {employees.length}</h2>
          <div>
            {!hasCheckedIn && (
              <ChechInButton setHasCheckedIn={setHasCheckedIn} />
            )}
            {!hasCheckedOut && hasCheckedIn && (
              <CheckOutButton setHasCheckedOut={setHasCheckedOut} />
            )}
            <Clock />
          </div>

          <h2>Today's Attendance</h2>
          {todaysAttendance ? (
            <>
              <h2>Checked In: {formatDate(todaysAttendance.checkIn)}</h2>
              <h2>Status: {todaysAttendance.status}</h2>
              {todaysAttendance.checkOut && (
                <>
                  <h2>Checked Out: {formatDate(todaysAttendance.checkOut)}</h2>
                  <h2>Hours Worked: {todaysAttendance.hoursWorked}</h2>
                </>
              )}
            </>
          ) : (
            <h2>You have not checked in today</h2>
          )}
        </div>
      </div>
      <LeaveApplications />
    </>
  );
}

export default ManagerDashboard;
