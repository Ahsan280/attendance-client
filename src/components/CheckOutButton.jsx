import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useAxios from "../utils/useAxios";
import { checkOutToday } from "../features/todaysAttendance/todaysAttendanceSlice";

function CheckOutButton({ setHasCheckedOut }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const api = useAxios();
  const handleCheckOut = async (e) => {
    setLoading(true);
    e.preventDefault();
    const date = new Date().toISOString();

    await dispatch(checkOutToday({ api, date, setHasCheckedOut }));
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <button className="btn btn-info" disabled>
          Check Out
        </button>
      ) : (
        <button className="btn btn-info" onClick={handleCheckOut}>
          Check Out
        </button>
      )}
    </>
  );
}

export default CheckOutButton;
