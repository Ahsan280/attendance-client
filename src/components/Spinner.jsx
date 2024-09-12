import React from "react";

const spinnerStyle = {
  border: "4px solid rgba(0, 0, 0, 0.1)",
  borderLeftColor: "#000",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  animation: "spin 1s linear infinite",
};
const bigSpinnerStyle = {
  border: "4px solid rgba(0, 0, 0, 0.1)",
  borderLeftColor: "#000",
  borderRadius: "50%",
  marginTop: "100px",
  width: "300px",
  height: "300px",
  animation: "spin 1s linear infinite",
};
const keyframesStyle = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
const spinnerContainer = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
};
const notSpinnerContainer = {
  display: "flex",
  width: "100%",
};

const Spinner = ({ notCenter, bigSpinner }) => {
  return (
    <div style={notCenter ? notSpinnerContainer : spinnerContainer}>
      <style>{keyframesStyle}</style>
      <div style={bigSpinner ? bigSpinnerStyle : spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
