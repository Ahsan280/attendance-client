import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";
export const fetchApplications = createAsyncThunk(
  "fetchApplications",
  async (api) => {
    const response = await api.get("v1/application/get-applications");
    return response.data.applications;
  }
);
export const approveApplication = createAsyncThunk(
  "approveApplication",
  async ({ api, applicationId }) => {
    const response = await api.post("v1/application/approve-appilcation", {
      applicationId,
    });
    return response.data.application;
  }
);
export const disapproveApplication = createAsyncThunk(
  "disapproveApplication",
  async ({ api, applicationId }) => {
    const response = await api.post("v1/application/disapprove-appilcation", {
      applicationId,
    });
    return response.data.application;
  }
);
const initialState = {
  applications: [],
  status: "idle",
  error: "null",
};
export const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        console.log(action);
        Swal.fire({
          title: "Error",
          text: action.error.message,
          icon: "error",
        });
      })
      .addCase(approveApplication.fulfilled, (state, action) => {
        state.applications = state.applications.filter((application) => {
          return application._id !== action.payload._id;
        });
        Swal.fire({
          title: "Success",
          text: "Application Approved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(approveApplication.rejected, (state, action) => {
        Swal.fire({
          title: "Error",
          text: action.error.message,
          icon: "error",
        });
      })
      .addCase(disapproveApplication.fulfilled, (state, action) => {
        state.applications = state.applications.filter((application) => {
          return application._id !== action.payload._id;
        });
        Swal.fire({
          title: "Success",
          text: "Application Disapproved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(disapproveApplication.rejected, (state, action) => {
        Swal.fire({
          title: "Error",
          text: action.error.message,
          icon: "error",
        });
      });
  },
});
export default applicationSlice.reducer;
