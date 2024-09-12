import React, { useState } from "react";
import { Modal, Button } from "antd";
import useAxios from "../utils/useAxios";
import { useDispatch } from "react-redux";
import { addEmployee } from "../features/employee/employeeSlice";
const AddEmployeeModal = () => {
  const dispatch = useDispatch();
  const api = useAxios();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setPassword("");
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const formData = { fullName, email, phoneNumber, password };
    await dispatch(addEmployee({ api, formData }));
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="btn btn-info" onClick={showModal}>
        Add Employee
      </button>
      <Modal
        title="Add Employee"
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
            Add Employee
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
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                rows="5"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddEmployeeModal;
