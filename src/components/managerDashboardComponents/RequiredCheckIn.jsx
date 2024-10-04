import React, { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import ChangeTimeModal from "./ChangeTimeModal";
import { useAuthContext } from "../../context/AuthContext";

function RequiredCheckIn() {
  const api = useAxios();
  const { user } = useAuthContext();
  const [time, setTime] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  useEffect(() => {
    const fetchRequiredCheckInTime = async () => {
      const response = await api.get(
        `v1/shift/get-shift/${user._id ? user._id : user.id}`
      );
      setstartTime(response.data.shift.startTime);
      setEndTime(response.data.shift.endTime);
      setTime(response.data.time.requiredCheckInTime);
    };
    fetchRequiredCheckInTime();
  }, []);
  return (
    <div className="d-flex gap-3">
      <h2>
        Required Check In Time: From:{startTime} To:{endTime}
      </h2>
      {/* <ChangeTimeModal time={time} setTime={setTime} /> */}
    </div>
  );
}

export default RequiredCheckIn;
