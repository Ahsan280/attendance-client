import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchEmployees = createAsyncThunk(
  "fetchEmployees",
  async (api) => {
    const response = await api.get("v1/users/all-users");

    return response.data;
  }
);
export const addEmployee = createAsyncThunk(
  "addEmployee",
  async ({ api, formData }) => {
    const response = await api.post("v1/users/register", formData);
    console.log(response.data.createduser);
    return response.data.createduser;
  }
);

export const editEmployee = createAsyncThunk(
  "editEmployee",
  async ({ api, formData }) => {
    const response = await api.post(`v1/users/update-user`, formData);
    console.log(response.data.updatedUser);
    return response.data.updatedUser;
  }
);
export const deleteEmployee = createAsyncThunk(
  "deleteEmployee",
  async ({ api, id }) => {
    console.log("SLICE", id);

    const response = await api.post(`v1/users/delete-user`, { id });
    console.log(response.data);
    return response.data.deletedUser;
  }
);
const initialState = {
  employees: [],
  status: "idle",
  error: "null",
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(action.error);
        // Swal.fire({
        //   title: "Error",
        //   text: action.error.message,
        //   icon: "error",
        // });
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
        Swal.fire({
          title: "Success",
          text: "Employee added successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(addEmployee.rejected, (state, action) => {
        console.log(action.error);
        Swal.fire({
          title: "Error",
          text: action.error.message,
          icon: "error",
        });
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.map((employee) => {
          if (employee._id === action.payload._id) {
            return action.payload;
          } else return employee;
        });
        Swal.fire({
          title: "Success",
          text: "Employee updated successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(editEmployee.rejected, (state, action) => {
        console.log(action.error);
        Swal.fire({
          title: "Error",
          text: action.error.message,
          icon: "error",
        });
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee._id !== action.payload._id
        );
        Swal.fire({
          title: "Success",
          text: "Employee deleted successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        console.log(action.error);
        Swal.fire({
          title: "Error",
          text: action.error.message,
          icon: "error",
        });
      });
  },
});
export default employeeSlice.reducer;
