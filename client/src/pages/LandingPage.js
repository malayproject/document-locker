import React from "react";
import { getAbsoluteUrl } from "../helpers";
import HeaderRibbon from "../components/HeaderRibbon";

const LandingPage = (props) => {
  return (
    <div className="App">
      <a href={getAbsoluteUrl("/auth/google")}>
        <button>Login with Google</button>
      </a>
      <HeaderRibbon />
    </div>
  );
};

export default LandingPage;
