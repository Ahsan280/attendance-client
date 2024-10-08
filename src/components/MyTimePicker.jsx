import React from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const MyTimePicker = ({ setTime }) => {
  const onChange = (time, timeString) => {
    console.log(time, timeString);
    setTime(timeString);
  };
  return (
    <TimePicker
      onChange={onChange}
      defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
    />
  );
};
export default MyTimePicker;
