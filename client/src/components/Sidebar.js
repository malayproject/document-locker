import { memo } from "react";
import upload_svg from "../assets/upload-solid.svg";

const Sidebar = ({ handleFileChange, handleLogout, file }) => {
  return (
    <div className="sidebar">
      <div className="logoContainer">
        <span>Docu-Locker</span>
      </div>
      <div className="featureContainer">
        <div className="feature">
          <div onClick={handleLogout} style={{ paddingLeft: "1rem" }}>
            Logout
          </div>
        </div>
        <label htmlFor="fileinput" className="feature">
          <div className="" style={{ paddingLeft: "1rem" }}>
            Upload file
            <img src={upload_svg} alt="" width="18px" height="auto" />
            <input
              id="fileinput"
              type="file"
              onChange={handleFileChange}
              style={{ width: 0 }}
            />
          </div>
        </label>
        <div className="feature">
          <div className="" style={{ paddingLeft: "1rem" }}>
            Add new tag
          </div>
        </div>
        <div className="feature">
          <div className="" style={{ paddingLeft: "1rem" }}>
            sdfdf
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
