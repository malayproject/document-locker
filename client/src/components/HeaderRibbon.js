import React from "react";

const HeaderRibbon = (props) => {
  return (
    <div className="header ribbon">
      <div className="leftSide"></div>
      <div className="rightSide">
        <div className="signin">Sign In</div>
        <div className="signup">Sign Up</div>
      </div>
    </div>
  );
};

export default HeaderRibbon;
