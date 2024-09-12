import React from "react";

function SingleEmployee({ employee, getAttendanceDetails }) {
  const { checkInTime, checkOutTime, status, hoursWorked } =
    getAttendanceDetails(employee._id);
  return (
    <div>
      <h2>{employee.fullName}</h2>
      <h2>{checkInTime}</h2>
      <h2>{checkOutTime}</h2>
      <h2>{status}</h2>
      <h2>{hoursWorked}</h2>
    </div>
  );
}

export default SingleEmployee;
