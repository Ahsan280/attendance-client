import React from "react";
import MyDatePicker from "./MyDatePicker";
import { useState } from "react";
import useAxios from "../utils/useAxios";
import Swal from "sweetalert2";
import Spinner from "./Spinner";
function ApplyForLeave() {
  const api = useAxios();
  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = { reason, toDate, fromDate };
    try {
      const response = await api.post(
        "v1/application/create-appilcation",
        formData
      );

      Swal.fire({
        title: "Application submitted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error.response.data.error);
      Swal.fire({
        title: "Error",
        text: error.response.data.error,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3 py-5">
          <div className="card bg-info mt-5 text-white">
            <div className="card-body vstack gap-3">
              <h2 className="card-title">Leave Application</h2>
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Reason:
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Reason"
                  rows={5}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  value={reason}
                />
              </div>
              <div className="form-group  d-flex justify-content-between">
                <label htmlFor="" className="form-label">
                  From:
                </label>
                <MyDatePicker setDate={setFromDate} />
              </div>
              <div className="form-group  d-flex justify-content-between">
                <label htmlFor="" className="form-label">
                  To:
                </label>
                <MyDatePicker setDate={setToDate} />
              </div>
              {loading ? (
                <button className="btn btn-warning">
                  <Spinner />
                </button>
              ) : (
                <button className="btn btn-warning" onClick={handleApply}>
                  Apply
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyForLeave;
