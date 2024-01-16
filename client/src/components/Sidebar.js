import { memo, useCallback } from "react";
import doculockerIcon from "../assets/cloud-store.png";
import upload_svg from "../assets/upload-solid.svg";
import leftArrowPng from "../assets/left-arrow-angle.png";
import rightArrowPng from "../assets/right-arrow-angle.png";
import logoutSvg from "../assets/logout-1.svg";
import homeSvg from "../assets/house-solid.svg";
import trashSvg from "../assets/trash_18.svg";
import starSvg from "../assets/star-solid.svg";
import tagsSvg from "../assets/tags-solid.svg";

import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  fetchFilesData,
  fetchFilesDataWithTagsFilter,
  fetchTagsData,
  handleFileUpload,
} from "../redux/actionCreators";
import ToolTipComponent from "./ToolTipComponent";

const Sidebar = ({ handleLogout }) => {
  const dispatch = useDispatch();

  const userTags = useSelector((state) => state.userTagsData.userTags);
  const { userTagsFeatureExpanded, sidebarExpanded } = useSelector(
    (state) => state.sidebar
  );

  const { fileToBeUploaded, fileUploading, forceUpload, error } = useSelector(
    (state) => state.fileUpload
  );

  const handleFileChange = useCallback(
    (e) => {
      if (!e.target.files?.length) return;
      const inputFile = e.target.files[0];
      dispatch(handleFileUpload(inputFile, false));
    },
    [dispatch]
  );

  const handleTagSelect = (e) => {
    console.log("32 span", e.target.innerText);
    const userTag = _.find(userTags, { tagName: e.target.innerText });
    dispatch({ type: "USER_SELECTED_TAG_ADD", payload: userTag._id });
    dispatch(fetchFilesData());
  };

  return (
    <div className={`sidebar${sidebarExpanded ? "" : " collapsed"}`}>
      <div className="logoContainer">
        <img src={doculockerIcon} alt="logo" width="40" height="40" />
        <span style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
          Docu-Locker
        </span>
      </div>
      <div className="featureContainer">
        <div className="feature">
          <div
            className="tooltip"
            onClick={handleLogout}
            style={{ paddingLeft: "0.5rem" }}
          >
            <img src={logoutSvg} alt="logout" width="31" />
            <span className={`featureText${sidebarExpanded ? "" : " hidden"}`}>
              Logout
            </span>
            {!sidebarExpanded && (
              <ToolTipComponent toolTipText="logout" position="right" />
            )}
          </div>
        </div>
        <label htmlFor="fileinput" className="feature">
          <div className="tooltip" style={{ paddingLeft: "0.6rem" }}>
            <img src={upload_svg} alt="" width="26" height="auto" />
            <span className={`featureText${sidebarExpanded ? "" : " hidden"}`}>
              Upload file
            </span>
            {!sidebarExpanded && (
              <ToolTipComponent toolTipText="upload file" position="right" />
            )}
            <input
              id="fileinput"
              type="file"
              onChange={handleFileChange}
              style={{ width: 0 }}
            />
          </div>
        </label>
        <div
          className="feature"
          onClick={() => {
            dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
            dispatch({ type: "MARKED_DELETED_UPDATE", payload: false });
            dispatch(fetchFilesData());
          }}
        >
          <div className="tooltip" style={{ paddingLeft: "0.6rem" }}>
            <img src={homeSvg} alt="home" width="26" />
            <span className={`featureText${sidebarExpanded ? "" : " hidden"}`}>
              DashBoard
            </span>
            {!sidebarExpanded && (
              <ToolTipComponent toolTipText="dashboard" position="right" />
            )}
          </div>
        </div>
        <div
          className="feature"
          onClick={() => {
            dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
            dispatch({ type: "MARKED_DELETED_UPDATE", payload: true });
            dispatch(fetchFilesData());
          }}
        >
          <div className="tooltip" style={{ paddingLeft: "0.5rem" }}>
            <img src={trashSvg} alt="home" width="28" />
            <span className={`featureText${sidebarExpanded ? "" : " hidden"}`}>
              Trash
            </span>
            {!sidebarExpanded && (
              <ToolTipComponent toolTipText="deleted files" position="right" />
            )}
          </div>
        </div>
        <div
          className="feature"
          onClick={() => {
            dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
            dispatch({ type: "MARKED_DELETED_UPDATE", payload: false });
            dispatch(fetchFilesData({ starred: true }));
          }}
        >
          <div className="tooltip" style={{ paddingLeft: "0.5rem" }}>
            <img src={starSvg} alt="home" width="28" />
            <span className={`featureText${sidebarExpanded ? "" : " hidden"}`}>
              Starred
            </span>
            {!sidebarExpanded && (
              <ToolTipComponent toolTipText="starred files" position="right" />
            )}
          </div>
        </div>
        {/* <div
          className="feature"
          onClick={() => {
            dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
            dispatch({ type: "MARKED_DELETED_UPDATE", payload: true });
            dispatch(fetchFilesData());
          }}
        >
          <div className="" style={{ paddingLeft: "1rem" }}>
            Recent
          </div>
        </div> */}
        <div
          className="feature tagFeature"
          onClick={(e) => {
            e.stopPropagation();
            if (!userTagsFeatureExpanded) dispatch(fetchTagsData());

            dispatch({ type: "USER_TAGS_EXPAND" });
          }}
        >
          <div
            className="tooltip"
            style={{ paddingLeft: "0.5rem", position: "relative" }}
          >
            <img src={tagsSvg} alt="home" width="27" />
            <span className={`featureText${sidebarExpanded ? "" : " hidden"}`}>
              User Tags
            </span>
            {!sidebarExpanded && (
              <ToolTipComponent toolTipText="user tags" position="right" />
            )}
          </div>
        </div>
        <div
          className={`tagsContainer${userTagsFeatureExpanded ? "" : " hidden"}`}
        >
          <span className="createATag">Create a tag</span>
          {userTags.map((userTag) => {
            return (
              <span
                className="tags"
                key={userTag._id}
                onClick={handleTagSelect}
              >
                {userTag.tagName}
              </span>
            );
          })}
        </div>
      </div>
      <div
        className="collapseBtnContainer"
        onClick={() => dispatch({ type: "SIDEBAR_EXPAND" })}
      >
        <img
          src={sidebarExpanded ? leftArrowPng : rightArrowPng}
          alt="expand/collapse"
          width="20"
        />
      </div>
    </div>
  );
};

export default memo(Sidebar);
