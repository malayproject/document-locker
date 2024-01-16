import React, { memo } from "react";

const ToolTipComponent = (props) => {
  const { toolTipText = "", position } = props || {};
  let styleObj = null;
  switch (position) {
    case "top":
      styleObj = {
        top: "-3rem",
      };
      break;
    case "right":
      styleObj = {
        left: "3rem",
      };
      break;
    case "top-left":
      styleObj = {
        top: "-3rem",
        right: "0rem",
      };
      break;
    case "top-right":
      styleObj = {
        top: "-3rem",
        left: "0rem",
      };
      break;
    case "bottom-left":
      styleObj = {
        bottom: "-3rem",
        right: "0rem",
      };
      break;
    default:
      styleObj = {
        bottom: "-3rem",
        left: "0rem",
      };
  }
  return (
    <span className="toolTipText" style={styleObj}>
      {toolTipText}
    </span>
  );
};

export default memo(ToolTipComponent);
