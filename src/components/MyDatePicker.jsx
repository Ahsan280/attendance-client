import React from "react";
import { DatePicker, Space } from "antd";

const MyDatePicker = ({ setDate }) => {
  const onChange = (date, dateString) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(selectedDate.getHours() + 5);
    const isoString = selectedDate.toISOString();
    console.log(isoString);
    setDate(isoString);
  };
  return (
    <Space direction="vertical">
      <DatePicker onChange={onChange} />
    </Space>
  );
};
export default MyDatePicker;
