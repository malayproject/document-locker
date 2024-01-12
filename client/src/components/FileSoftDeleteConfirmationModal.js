import axios from "axios";
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilesData } from "../redux/actionCreators";

const FileSoftDeleteConfirmationModal = (
  {
    //   setShowFileSoftDeleteConfModal,
    //   isFileUpdating,
    //   selectedFileInfo,
  }
) => {
  const dispatch = useDispatch();
  const selectedFile = useSelector((state) => state.selectFile.selectedFile);
  const handleCancel = () => {
    dispatch({ type: "UNSELECT_FILE" });
    dispatch({ type: "FILE_SOFT_DELETE_CONFIRMATION_MODAL", payload: false });
  };
  const handleClick = useCallback(async () => {
    dispatch({ type: "FILE_UPDATE_PENDING", payload: selectedFile });
    try {
      const res = await axios.delete(`/api/file/${selectedFile?._id}`);
      dispatch({ type: "FILE_UPDATE_FULFILLED" });
      dispatch({ type: "FILE_SOFT_DELETE_CONFIRMATION_MODAL", payload: true });
      dispatch(fetchFilesData());
      dispatch({ type: "FILE_SOFT_DELETE_CONFIRMATION_MODAL", payload: false });
    } catch (err) {
      dispatch({ type: "FILE_UPDATE_REJECTED", error: err.message });
      dispatch({ type: "FILE_SOFT_DELETE_CONFIRMATION_MODAL", payload: false });
      console.log(err.message);
    }
  }, [dispatch, selectedFile]);
  return (
    <div className="filesoftdeleteconfmodal">
      <div className="statustext">Do you want to soft delete this file?</div>
      <div className="statusfooter">
        <button onClick={handleClick}>Ok</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default memo(FileSoftDeleteConfirmationModal);
