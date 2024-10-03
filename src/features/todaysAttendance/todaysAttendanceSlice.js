import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchTodaysAttendance = createAsyncThunk(
  "fetchTodaysAttendance",
  async ({ api, date, id }) => {
    const response = await api.get(
      `v1/attendance/filter-by-date-user/${date}/${id}`
    );

    return response.data;
  }
);

export const checkInToday = createAsyncThunk(
  "checkInToday",
  async (
    { api, date, timezone, setHasCheckedIn, latitude, longitude },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`v1/attendance/check-in`, {
        date,
        timezone,
        latitude,
        longitude,
      });

      setHasCheckedIn(true);
      return response.data.attendance;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const checkOutToday = createAsyncThunk(
  "checkOutToday",
  async ({ api, date, setHasCheckedOut }) => {
    const today = new Date();
    const response = await api.post(`v1/attendance/check-out`, {
      today,
      checkOut: date,
    });
    setHasCheckedOut(true);
    return response.data.attendance;
  }
);
const initialState = {
  todaysAttendance: {},
  status: "idle",
  error: "null",
};

export const todaysAttendanceSlice = createSlice({
  name: "todaysAttendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodaysAttendance.fulfilled, (state, action) => {
        state.todaysAttendance = action.payload;
      })
      .addCase(fetchTodaysAttendance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;

        Swal.fire({
          title: "Error",
          text: action.error.message,
          icon: "error",
        });
      })
      .addCase(checkInToday.fulfilled, (state, action) => {
        state.todaysAttendance = action.payload;
        Swal.fire({
          title: "Checked In Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(checkInToday.rejected, (state, action) => {
        Swal.fire({
          title: "Error",
          text: action.payload.error,
          icon: "error",
        });
      })
      .addCase(checkOutToday.fulfilled, (state, action) => {
        state.todaysAttendance = action.payload;
        Swal.fire({
          title: "Checked Out Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(checkOutToday.rejected, (state, action) => {
        console.log(action.error);
        Swal.fire({
          title: "Error",
          text: action.error.message,
          icon: "error",
        });
      });
  },
});
export default todaysAttendanceSlice.reducer;
