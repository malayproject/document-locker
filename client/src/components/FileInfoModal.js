import { format } from "date-fns";
import { getBytesToKiloBytes, getFileText, getUser } from "../helpers";
import { useEffect, useState } from "react";

const FileInfoModal = (props) => {
  const { setShowFileInfoModal, selectedFileInfo } = props;
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        console.log("user 12", user.data);
        setUserProfile(user.data?.googleProfile);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  return (
    <div className="fileInfoModal">
      <div className="modalHeader">{selectedFileInfo?.fileName || "file"}</div>
      <div className="modalBody">
        <div className="bodyLeft">
          <div className="createdDateDiv">{`Created at: ${format(
            selectedFileInfo?.createdAt,
            "Pp"
          )}`}</div>
          <div className="createdDateDiv">{`Owner: ${userProfile?.displayName}`}</div>
          <div className="fileNameDiv">{`File Name: ${selectedFileInfo?.fileName}`}</div>
          <div className="fileMarkedDeletedDiv">{`File marked deleted: ${selectedFileInfo?.markedDeleted}`}</div>
          <div className="fileSizeDiv">{`File size: ${getBytesToKiloBytes(
            selectedFileInfo?.fileSize
          )} kB`}</div>
        </div>
        <div className="bodyRight">
          <div className="fileImage">
            <div className="fileText">
              {getFileText(selectedFileInfo?.mimeType)}
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setShowFileInfoModal(false)}>Close</button>
    </div>
  );
};

export default FileInfoModal;
