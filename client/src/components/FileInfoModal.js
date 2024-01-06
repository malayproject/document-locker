import { format } from "date-fns";
import { getBytesToKiloBytes, getFileText, getUser } from "../helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FileInfoModal = (props) => {
  const dispatch = useDispatch();
  const selectedFile = useSelector((state) => state.selectFile.selectedFile);

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

  return (
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
          <div className="fileSizeDiv">{`File size: ${getBytesToKiloBytes(
            selectedFile?.fileSize
          )} kB`}</div>
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
        onClick={() => dispatch({ type: "FILE_INFO_MODAL", payload: false })}
      >
        Close
      </button>
    </div>
  );
};

export default FileInfoModal;
