import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxios from "../../utils/useAxios";
import { fetchEmployees } from "../../features/employee/employeeSlice";
import SingleEmployee from "./SingleEmployee";

function Employees() {
  const api = useAxios();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  useEffect(() => {
    dispatch(fetchEmployees(api));
  }, []);
  return (
    <div>
      {employees.map((employee) => {
        return <SingleEmployee key={employee._id} employee={employee} />;
      })}
    </div>
  );
}

export default Employees;
