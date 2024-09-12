import React, { useState } from "react";
import { Modal, Button } from "antd";
import Swal from "sweetalert2";
import { EditOutlined } from "@ant-design/icons";
import MyTimePicker from "../MyTimePicker";
import useAxios from "../../utils/useAxios";
const ChangeTimeModal = ({ time, setTime }) => {
  const api = useAxios();
  const [requiredCheckInTime, setRequiredCheckInTime] = useState(time);

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setRequiredCheckInTime(time);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const response = await api.post("v1/time/change-time", {
        requiredCheckInTime,
      });

      setTime(response.data.time.requiredCheckInTime);
      setLoading(false);
      setIsModalOpen(false);
      Swal.fire({
        title: "Time updated successfully",
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
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <EditOutlined className="ant-icon me-2" onClick={showModal} />

      <Modal
        title="Change Time"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
            <MyTimePicker setTime={setRequiredCheckInTime} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChangeTimeModal;
