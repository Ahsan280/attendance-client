import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import MyAttendanceTable from "./MyAttendanceTable";
import useAxios from "../../utils/useAxios";
function MyAttandance() {
  const api = useAxios();
  const [attendances, setAttendances] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchAttendances = async () => {
      const response = await api.get(
        `v1/attendance/filter-by-user/${user._id}`
      );

      setAttendances(response.data);
    };
    fetchAttendances();
  }, []);
  return (
    <div className="container p-5 ">
      <MyAttendanceTable attendances={attendances} />
    </div>
  );
}

export default MyAttandance;
