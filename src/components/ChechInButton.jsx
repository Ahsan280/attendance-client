import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAxios from "../utils/useAxios";
import { checkInToday } from "../features/todaysAttendance/todaysAttendanceSlice";
import Swal from "sweetalert2";
function ChechInButton({ setHasCheckedIn }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const api = useAxios();

  const handleCheckIn = async (e) => {
    setLoading(true);
    e.preventDefault();

    const getPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    try {
      const position = await getPosition();
      const latitude = position.coords.latitude; // Use directly from position
      const longitude = position.coords.longitude;
      const date = new Date().toISOString();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      await dispatch(
        checkInToday({
          api,
          date,
          timezone,
          setHasCheckedIn,
          latitude,
          longitude,
        })
      );
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to get your location. Please allow to get your location in the permissions settings",
        icon: "error",
      });
      setLoading(false);
      return;
    }

    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <button className="btn btn-info" disabled>
          Check In
        </button>
      ) : (
        <button className="btn btn-info" onClick={handleCheckIn}>
          Check In
        </button>
      )}
    </>
  );
}

export default ChechInButton;
