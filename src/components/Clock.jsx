import React, { useState, useEffect } from "react";
import { Typography } from "antd";

const { Text } = Typography;

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
      {time.toLocaleTimeString()}
    </Text>
  );
};

export default Clock;
