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

  const handleModalClose = useCallback(
    (e) => {
      e.stopPropagation();
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("modalClose")
      ) {
        dispatch({ type: "UNSELECT_FILE" });
        dispatch({ type: "FILE_INFO_MODAL", payload: false });
      }
    },
    [dispatch]
  );

  return fileUploading ? (
    <div>updating</div>
  ) : (
    <div className="modal" onClick={handleModalClose}>
      <div className="fileInfoModal">
        <div className="modalHeader">
          <div className="fileNameDiv">{selectedFile?.fileName || "file"}</div>
          <div className="btnsContainer">
            <button className="modalSave" onClick={handleFileUpdate}>
              save
            </button>
            <button className="modalClose" onClick={handleModalClose}>
              X
            </button>
          </div>
        </div>
        <div className="modalBody">
          <div className="bodyLeft">
            <div className="createdDateDiv">
              <div className="label">Created at:</div>
              <strong className="value">{`${format(
                selectedFile?.createdAt,
                "Pp"
              )}`}</strong>
            </div>
            <div className="createdDateDiv">
              <div className="label">Owner:</div>
              <strong className="value">{userProfile?.displayName}</strong>
            </div>
            <div className="fileMarkedDeletedDiv">
              <div className="label">Deleted:</div>
              <strong className="value">
                {selectedFile?.markedDeleted || "false"}
              </strong>
            </div>
            <div className="fileSizeDiv">
              <div className="label">File size:</div>
              <strong className="value">
                {`${getBytesToKiloBytes(selectedFile?.fileSize)} kB`}
              </strong>
            </div>
            <div className="isFileTagContainer">
              <div className="label">File Tags:</div>
              <div className="value">
                {modalTempSelectedFileTagIds.length === 0
                  ? "No Tags"
                  : modalTempSelectedFileTagIds
                      // .filter((userTag) => selectedFile.tagIds.includes(userTag._id))
                      .map((fileTagId) => {
                        return (
                          <div
                            className="isFileTag"
                            onClick={() => handleTagRemove(fileTagId)}
                            style={{
                              backgroundColor: "#04aa6d",
                              borderRadius: "0.8rem",
                              width: "max-content",
                              padding: "0rem 0.6rem 0.2rem 0.6rem",
                              color: "white",
                              fontSize: "0.8rem",
                              fontWeight: 500,
                              marginLeft: "0.2rem",
                            }}
                          >
                            {
                              userTags.find(
                                (userTag) => userTag._id === fileTagId
                              )?.tagName
                            }
                          </div>
                        );
                      })}
              </div>
            </div>
            <div className="editTagsContainer">
              <div className="isNotFileTagContainer">
                <div className="label">Add Tags:</div>
                <div className="isNotFileTags">
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
          </div>
          <div className="bodyRight">
            <div className="fileImage">
              <div className="fileText">
                {getFileText(selectedFile?.mimeType)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInfoModal;
