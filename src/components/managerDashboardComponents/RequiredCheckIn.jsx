import React, { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import ChangeTimeModal from "./ChangeTimeModal";

function RequiredCheckIn() {
  const api = useAxios();

  const [time, setTime] = useState("");
  useEffect(() => {
    const fetchRequiredCheckInTime = async () => {
      const response = await api.get(`v1/time/get-time`);
      setTime(response.data.time.requiredCheckInTime);
    };
    fetchRequiredCheckInTime();
  }, []);
  return (
    <div className="d-flex gap-3">
      <h2>Required Check In Time: {time}</h2>
      <ChangeTimeModal time={time} setTime={setTime} />
    </div>
  );
}

export default RequiredCheckIn;
