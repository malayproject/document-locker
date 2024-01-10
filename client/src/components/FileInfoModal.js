import { format } from "date-fns";
import { getBytesToKiloBytes, getFileText, getUser } from "../helpers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchFilesData,
  handleFileFieldsUpdate,
} from "../redux/actionCreators";

const FileInfoModal = (props) => {
  const dispatch = useDispatch();
  const { selectedFile, modalTempSelectedFileTagIds } = useSelector(
    (state) => state.selectFile
  );
  const { fileToBeUploaded, fileUploading } = useSelector(
    (state) => state.fileUpload
  );
  const userTags = useSelector((state) => state.userTagsData.userTags);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        setUserProfile(user.data?.googleProfile);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  const handleTagRemove = useCallback(
    (fileTagId) => {
      dispatch({ type: "REMOVE_MODAL_TEMP_TAGID", payload: fileTagId });
    },
    [dispatch]
  );
  const handleTagAdd = useCallback(
    (userTagId) => {
      dispatch({ type: "ADD_MODAL_TEMP_TAGID", payload: userTagId });
    },
    [dispatch]
  );

  const handleFileUpdate = async () => {
    dispatch(handleFileFieldsUpdate());
  };

  return fileUploading ? (
    <div>updating</div>
  ) : (
    <div className="fileInfoModal">
      <div className="modalHeader">{selectedFile?.fileName || "file"}</div>
      <div className="modalBody">
        <div className="bodyLeft">
          <div className="createdDateDiv">{`Created at: ${format(
            selectedFile?.createdAt,
            "Pp"
          )}`}</div>
          <div className="createdDateDiv">{`Owner: ${userProfile?.displayName}`}</div>
          <div className="fileNameDiv">{`File Name: ${selectedFile?.fileName}`}</div>
          <div className="fileMarkedDeletedDiv">{`File marked deleted: ${selectedFile?.markedDeleted}`}</div>
          <div className="fileSizeDiv">
            {`File size: ${getBytesToKiloBytes(selectedFile?.fileSize)} kB`}
          </div>
          <div className="editTagsContainer">
            <div className="isFileTagContainer">
              {modalTempSelectedFileTagIds
                // .filter((userTag) => selectedFile.tagIds.includes(userTag._id))
                .map((fileTagId) => {
                  return (
                    <div
                      className="isFileTag"
                      onClick={() => handleTagRemove(fileTagId)}
                      style={{
                        backgroundColor: "red",
                        borderRadius: "0.8rem",
                        width: "max-content",
                        padding: "0rem 0.6rem 0.2rem 0.6rem",
                      }}
                    >
                      {
                        userTags.find((userTag) => userTag._id === fileTagId)
                          ?.tagName
                      }
                    </div>
                  );
                })}
            </div>
            <div className="isNotFileTagContainer">
              {userTags
                .filter(
                  (userTag) =>
                    !modalTempSelectedFileTagIds.includes(userTag._id)
                )
                .map((userTag) => {
                  return (
                    <div
                      className="isNotFileTag"
                      onClick={() => handleTagAdd(userTag._id)}
                    >
                      {userTag.tagName}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="bodyRight">
          <div className="fileImage">
            <div className="fileText">
              {getFileText(selectedFile?.mimeType)}
            </div>
          </div>
        </div>
      </div>
      <button
        className="modalSave"
        onClick={handleFileUpdate}
        // onClick={() => dispatch({ type: "FILE_INFO_MODAL", payload: false })}
      >
        Save
      </button>
      <button
        className="modalClose"
        onClick={() => {
          dispatch({ type: "UNSELECT_FILE" });
          dispatch({ type: "FILE_INFO_MODAL", payload: false });
        }}
      >
        Close
      </button>
    </div>
  );
};

export default FileInfoModal;
