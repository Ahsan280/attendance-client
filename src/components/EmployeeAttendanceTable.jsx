import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import EditEmployeeModal from "./EditEmployeeModal";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../features/employee/employeeSlice";
import Swal from "sweetalert2";
import useAxios from "../utils/useAxios";
function EmployeeAttendanceTable({ employees, getAttendanceDetails }) {
  const dispatch = useDispatch();
  const api = useAxios();
  const handleDelete = async (e, employee) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#874f41",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      preConfirm: () => {
        Swal.showLoading();

        return dispatch(deleteEmployee({ api, id: employee.key }));
      },
    });
  };
  const columns = [
    {
      title: "Employee Name",
      dataIndex: "fullName",
      key: "fullName",
    },

    {
      title: "Check In Time",
      dataIndex: "checkInTime",
      key: "checkInTime",
    },
    {
      title: "Check Out Time",
      dataIndex: "checkOutTime",
      key: "checkOutTime",
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
  const dataSource = employees.map((employee) => {
    const attendanceDetails = getAttendanceDetails(employee._id);
    return {
      key: employee._id,
      fullName: employee.fullName,

      ...attendanceDetails,
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

export default EmployeeAttendanceTable;
