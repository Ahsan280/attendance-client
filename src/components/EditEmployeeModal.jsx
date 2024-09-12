import React, { useState } from "react";
import { Modal, Button } from "antd";
import useAxios from "../utils/useAxios";
import { useDispatch } from "react-redux";
import { editEmployee } from "../features/employee/employeeSlice";
import { EditOutlined } from "@ant-design/icons";
const EditEmployeeModal = ({ employee }) => {
  const dispatch = useDispatch();
  const api = useAxios();
  const [fullName, setFullName] = useState(employee.fullName);
  const [email, setEmail] = useState(employee.email);
  const [phoneNumber, setPhoneNumber] = useState(employee.phoneNumber);
  //   const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    // setPassword(employee.password);
    setFullName(employee.fullName);
    setEmail(employee.email);
    setPhoneNumber(employee.phoneNumber);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const formData = { id: employee.key, fullName, email, phoneNumber };
    await dispatch(editEmployee({ api, formData }));
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <EditOutlined className="ant-icon me-2" onClick={showModal} />

      <Modal
        title="Edit Employee"
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
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                value={fullName}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                rows="5"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number"
                rows="5"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                value={phoneNumber}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditEmployeeModal;
