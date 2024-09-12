import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../../utils/useAxios";
import { fetchEmployees } from "../../features/employee/employeeSlice";
import EmployeeTable from "../EmployeeTable";
import { formatDate } from "../../utils/helperFunctions";
import MyDatePicker from "../MyDatePicker";
import EmployeeAttendanceTable from "../EmployeeAttendanceTable";
function ManagerAttendance() {
  const api = useAxios();
  const employees = useSelector((state) => state.employees.employees);
  const [attendances, setAttendances] = useState({});
  const [date, setDate] = useState(() => {
    return new Date().toISOString();
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmployees(api));
  }, []);
  useEffect(() => {
    const fetchAttendanceData = async () => {
      const response = await api.get(`v1/attendance/filter-by-date/${date}`);
      let attendanceHash = {};
      response.data.forEach((attendance) => {
        attendanceHash[attendance.user] = attendance;
      });
      setAttendances(attendanceHash);
    };
    fetchAttendanceData();
  }, [date]);
  const getAttendanceDetails = (employeeId) => {
    const attendance = attendances[employeeId];
    if (attendance) {
      return {
        status: attendance?.status,
        checkInTime:
          attendance.status === "leave"
            ? "N/A"
            : formatDate(attendance?.checkIn),
        checkOutTime: attendance.checkOut
          ? formatDate(attendance?.checkOut)
          : "N/A",
        hoursWorked: attendance.hoursWorked ? attendance.hoursWorked : "N/A",
      };
    } else {
      return {
        status: "Absent",
        checkInTime: "N/A",
        checkOutTime: "N/A",
        hoursWorked: "N/A",
      };
    }
  };
  return (
    <div className="container p-4">
      <div className="d-flex gap-3">
        <h5>Filter By Date:</h5>
        <MyDatePicker setDate={setDate} />
      </div>
      <EmployeeAttendanceTable
        employees={employees}
        getAttendanceDetails={getAttendanceDetails}
      />
      {/* <EmployeeTable
        employees={employees}
        getAttendanceDetails={getAttendanceDetails}
      /> */}
    </div>
  );
}

export default ManagerAttendance;
