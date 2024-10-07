import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "../../features/employee/employeeSlice";
import useAxios from "../../utils/useAxios";
import { formatDate } from "../../utils/helperFunctions";
// import MapComponent from "./MapComponent";
import EmployeeTable from "../EmployeeTable";
import AddEmployeeModal from "../AddEmployeeModal";
import MapComponent from "../MapComponent";

function AllEmployees() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const [attendances, setAttendances] = useState({});
  const [officeLocation, setOfficeLocation] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const api = useAxios();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      dispatch(fetchEmployees(api));
    };
    const fetchAttendanceData = async () => {
      const date = new Date().toISOString();
      const response = await api.get(`v1/attendance/filter-by-date/${date}`);

      let attendanceHash = {};
      response.data.forEach((attendance) => {
        attendanceHash[attendance.user] = attendance;
      });
      setAttendances(attendanceHash);
    };
    fetchAttendanceData();
    fetchEmployeeData();
  }, []);
  useEffect(() => {
    const fetchOfficeLocation = async () => {
      const response = await api.get("v1/office/get-office-location");

      setOfficeLocation(response.data.officeLocation);
    };
    fetchOfficeLocation();
  }, []);
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
    <div className="d-flex flex-column ">
      <div className="card m-4 bg-warning">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h2 className="card-title">Total Employees: {employees.length}</h2>

            <AddEmployeeModal />
          </div>
        </div>
      </div>
      <div className="mx-4" style={{ overflowX: "auto" }}>
        <EmployeeTable
          employees={employees}
          getAttendanceDetails={getAttendanceDetails}
        />
      </div>
      {officeLocation && (
        <div className="container">
          <h2 className="text-center">Office Location:</h2>
          <MapComponent
            officeLocation={officeLocation}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
          />

          <button
            className="btn btn-info"
            onClick={() => {
              setIsEditable(true);
            }}
          >
            Change Location
          </button>
        </div>
      )}
    </div>
  );
}

export default AllEmployees;
