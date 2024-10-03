import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import EditEmployeeModal from "./EditEmployeeModal";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../features/employee/employeeSlice";
import Swal from "sweetalert2";
import useAxios from "../utils/useAxios";
import AssignShiftModal from "./managerDashboardComponents/AssignShiftModal";
function EmployeeTable({ employees, getAttendanceDetails }) {
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
    {
      title: "Actions",
      key: "actions",
      render: (text, employee) => (
        <div>
          <EditEmployeeModal employee={employee} />

          <DeleteOutlined
            className="ant-icon"
            onClick={(e) => {
              handleDelete(e, employee);
            }}
          />
          <AssignShiftModal employee={employee} />
        </div>
      ),
    },
  ];
  const dataSource = employees.map((employee) => {
    const attendanceDetails = getAttendanceDetails(employee.id);
    return {
      key: employee.id,
      fullName: employee.fullName,
      phoneNumber: employee.phoneNumber,

      email: employee.email,
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

export default EmployeeTable;
