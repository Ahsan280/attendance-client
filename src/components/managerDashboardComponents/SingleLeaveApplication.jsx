import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../utils/helperFunctions";
import {
  approveApplication,
  disapproveApplication,
} from "../../features/application/applicationSlice";
import useAxios from "../../utils/useAxios";
import Spinner from "../Spinner";
function SingleLeaveApplication({ application }) {
  console.log(application);
  const [approveLoading, setApproveLoading] = useState(false);
  const [disApproveLoading, setDisApproveLoading] = useState(false);
  const api = useAxios();
  const dispatch = useDispatch();
  const handleApprove = async (e) => {
    e.preventDefault();
    setApproveLoading(true);
    await dispatch(approveApplication({ api, applicationId: application.id }));
    setApproveLoading(false);
  };
  const handleDisapprove = async (e) => {
    e.preventDefault();
    setDisApproveLoading(true);
    await dispatch(
      disapproveApplication({ api, applicationId: application._id })
    );
    setDisApproveLoading(false);
  };
  return (
    <div className="col-lg-4 my-5">
      <div className="card">
        <div className="card-body">
          <h5>Applicant:</h5>
          <p>{application.applicant.fullName}</p>
          <h5>Reason:</h5>
          <p className="card-text">{application.reason}</p>
          <p>From: {formatDate(application.fromDate).slice(0, 10)}</p>
          <p>To: {formatDate(application.toDate).slice(0, 10)}</p>
          <div className="d-flex justify-content-between">
            {approveLoading ? (
              <button className="btn btn-info" disabled>
                <Spinner />
              </button>
            ) : (
              <button className="btn btn-info" onClick={handleApprove}>
                Approve
              </button>
            )}
            {disApproveLoading ? (
              <button className="btn btn-info" disabled>
                <Spinner />
              </button>
            ) : (
              <button className="btn btn-info" onClick={handleDisapprove}>
                Disapprove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleLeaveApplication;
