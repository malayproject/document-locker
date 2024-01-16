import axios from "axios";
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilesData } from "../redux/actionCreators";

const FileSoftDeleteConfirmationModal = () => {
  const dispatch = useDispatch();
  const selectedFile = useSelector((state) => state.selectFile.selectedFile);

  const handleCancel = useCallback(
    (e) => {
      e.stopPropagation();
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("modalClose")
      ) {
        dispatch({ type: "UNSELECT_FILE" });
        dispatch({
          type: "FILE_SOFT_DELETE_CONFIRMATION_MODAL",
          payload: false,
        });
      }
    },
    [dispatch]
  );

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
    <div className="modal" onClick={handleCancel}>
      <div className="filesoftdeleteconfmodal">
        <div className="modalHeader">
          Confirm Delete
          <div className="btnsContainer">
            <button
              className="modalClose"
              onClick={handleCancel}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                backgroundColor: "#04aa6d",
                fontWeight: 600,
                width: "1.2rem",
                height: "1.2rem",
                borderRadius: "50%",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="modalBody">
          <div className="statusText">
            Do you want to soft delete this file?
          </div>
          <div className="statusFooter">
            <button
              onClick={handleClick}
              style={{
                border: "none",
                backgroundColor: "#04aa6d",
                fontWeight: 600,
                width: "3rem",
                height: "1.4rem",
                borderRadius: ".3rem",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FileSoftDeleteConfirmationModal);
