import { memo, useCallback } from "react";
import upload_svg from "../assets/upload-solid.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFilesData,
  fetchTagsData,
  handleFileUpload,
} from "../redux/actionCreators";

const Sidebar = ({ handleLogout }) => {
  const dispatch = useDispatch();

  const userTags = useSelector((state) => state.userTagsData.userTags);
  const userTagsFeatureExpanded = useSelector(
    (state) => state.sidebar.userTagsFeatureExpanded
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
        <div
          className="feature"
          onClick={() => {
            dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
            dispatch({ type: "MARKED_DELETED_UPDATE", payload: false });
            dispatch(fetchFilesData());
          }}
        >
          <div className="" style={{ paddingLeft: "1rem" }}>
            DashBoard
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
          <div className="" style={{ paddingLeft: "1rem" }}>
            Trash
          </div>
        </div>
        <div
          className="feature tagFeature"
          onClick={(e) => {
            e.stopPropagation();
            if (!userTagsFeatureExpanded) dispatch(fetchTagsData());

            dispatch({ type: "USER_TAGS_EXPAND" });
          }}
        >
          <div className="" style={{ paddingLeft: "1rem" }}>
            User Tags
          </div>
        </div>
        <div
          className={`tagsContainer${userTagsFeatureExpanded ? "" : " hidden"}`}
        >
          <span className="createATag">Create a tag</span>
          {userTags.map((userTag) => {
            return <span key={userTag._id}>{userTag.tagName}</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
