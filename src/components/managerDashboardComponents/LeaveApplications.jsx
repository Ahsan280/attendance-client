import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleLeaveApplication from "./SingleLeaveApplication";
import { fetchApplications } from "../../features/application/applicationSlice";
import useAxios from "../../utils/useAxios";
function LeaveApplications() {
  const dispatch = useDispatch();
  const api = useAxios();
  const applications = useSelector((state) => state.applications.applications);
  useEffect(() => {
    dispatch(fetchApplications(api));
  }, []);
  return (
    <div className="container mt-5">
      <div className="card bg-warning ">
        <div className="card-body">
          <h2 className="card-title">Leave Applications:</h2>
          <div className="row">
            {applications.map((application) => {
              return (
                <SingleLeaveApplication
                  key={application._id}
                  application={application}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveApplications;
