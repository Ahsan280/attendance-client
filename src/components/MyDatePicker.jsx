import React from "react";
import { DatePicker, Space } from "antd";

const MyDatePicker = ({ setDate }) => {
  const onChange = (date, dateString) => {
    setDate(date);
  };
  return (
    <Space direction="vertical">
      <DatePicker onChange={onChange} />
    </Space>
  );
};
export default MyDatePicker;
