import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employee/employeeSlice";
import todaysAttendanceReducer from "../features/todaysAttendance/todaysAttendanceSlice";
import applicationReducer from "../features/application/applicationSlice";
export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    todaysAttendance: todaysAttendanceReducer,
    applications: applicationReducer,
  },
});
