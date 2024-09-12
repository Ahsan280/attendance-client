import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useAxios from "../utils/useAxios";
import { checkInToday } from "../features/todaysAttendance/todaysAttendanceSlice";

function ChechInButton({ setHasCheckedIn }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const api = useAxios();
  const handleCheckIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    const date = new Date().toISOString();
    console.log(date);
    await dispatch(checkInToday({ api, date, setHasCheckedIn }));
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
