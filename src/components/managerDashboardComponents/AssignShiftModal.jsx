import React, { useState } from "react";
import { Modal, Button } from "antd";
import useAxios from "../../utils/useAxios";
import MyTimePicker from "../MyTimePicker";
import Swal from "sweetalert2";
const AssignShiftModal = ({ employee }) => {
  const api = useAxios();
  const [fullName, setFullName] = useState(employee.fullName);

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shiftType, setShiftType] = useState("");
  const showModal = () => {
    setFullName(employee.fullName);

    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    //------------
    try {
      const response = await api.post("v1/shift/assign-shift", {
        userId: employee.key,
        startTime,
        endTime,
        shiftType,
      });
      Swal.fire({
        title: "Shift Assigned Successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      Swal.fire({
        title: "Failed to Assign Shift",
        text: error.response.data.error,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="btn btn-info" onClick={showModal}>
        Assign Shift
      </button>

      <Modal
        title="Assign Shift"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // style={{ top: -5 }}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            style={{
              backgroundColor: "#f5222d",
              borderColor: "#f5222d",
              color: "#fff",
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
            style={{ backgroundColor: "#874f41", borderColor: "#874f41" }}
          >
            Update
          </Button>,
        ]}
      >
        <div>
          <div className="vstack gap-3">
            <h2>{fullName}</h2>
            <MyTimePicker setTime={setStartTime} />
            <MyTimePicker setTime={setEndTime} />
            <select
              className="form-select"
              value={shiftType}
              onChange={(e) => setShiftType(e.target.value)}
            >
              <option value={""}>Select</option>
              <option value={"remote"}>Remote</option>
              <option value={"on-site"}>On-Site</option>
            </select>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AssignShiftModal;
