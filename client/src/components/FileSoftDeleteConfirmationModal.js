import axios from "axios";
import { memo, useCallback } from "react";

const FileSoftDeleteConfirmationModal = ({
  setShowFileSoftDeleteConfModal,
  isFileUpdating,
  selectedFileInfo,
}) => {
  const handleClick = useCallback(async () => {
    setShowFileSoftDeleteConfModal(false);
    // isFileUpdating(true);
    console.log("1212", selectedFileInfo);
    try {
      const res = await axios.delete(
        `http://localhost:5100/api/file/${selectedFileInfo?._id}`
      );
    } catch (err) {
      console.log(err.message);
    }
  }, [setShowFileSoftDeleteConfModal, isFileUpdating]);
  return (
    <div className="filesoftdeleteconfmodal">
      <div className="statustext">Do you want to soft delete this file?</div>
      <div className="statusfooter">
        <button onClick={handleClick}>Ok</button>
      </div>
    </div>
  );
};

export default memo(FileSoftDeleteConfirmationModal);
