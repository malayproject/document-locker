import { memo } from "react";
import { getAbsoluteUrl } from "../helpers";
import { Link } from "react-router-dom";
import google_logo from "../assets/google-logo.png";
import github_logo from "../assets/github-mark.png";

const LandingPage = (props) => {
  return (
    <div className="landing">
      <div className="appDesc">
        <div className="appTagline">
          Access all the Docs you need
          <br />
          Anytime and anywhere, ALL IN ONE PLACE.
        </div>
        <div className="appImage"></div>
      </div>
      <div className="loginColumn">
        <div className="logoContainer">
          <span>Docu-Locker</span>
        </div>
        <div className="loginContainer">
          <div className="loginText">Login to your Docu-locker account</div>
          <Link to={getAbsoluteUrl("/auth/google")}>
            <button>
              <img src={google_logo} alt="" width="24px" height="auto" />
              <span>Login with Google</span>
            </button>
          </Link>
          <Link to={getAbsoluteUrl("/auth/google")}>
            <button>
              <img src={github_logo} alt="" width="20px" height="auto" />
              <span>Login with Github</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(LandingPage);
