import React, { useState } from "react";

import { Table } from "antd";
import { checkIn } from "../../../../backend/src/controllers/attendance.controller";
import { formatDate } from "../../utils/helperFunctions";

function MyAttendanceTable({ attendances }) {
  const columns = [
    {
      title: "Check In Time",
      dataIndex: "checkIn",
      key: "checkIn",
    },
    {
      title: "Check Out Time",
      dataIndex: "checkOut",
      key: "checkOut",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hours Worked",
      dataIndex: "hoursWorked",
      key: "hoursWorked",
    },
  ];
  const dataSource = attendances.map((attendance) => {
    return {
      checkIn: formatDate(attendance.checkIn),
      checkOut: attendance.checkOut ? formatDate(attendance.checkOut) : "N/A",
      hoursWorked: attendance.hoursWorked ? attendance.hoursWorked : "N/A",
      status: attendance.status,
    };
  });
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 4 }}
    />
  );
}

export default MyAttendanceTable;
