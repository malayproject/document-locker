import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { handleFileUpload } from "../redux/actionCreators";

const FileUploadConfirmationModal = () => {
  const dispatch = useDispatch();

  const handleCancel = useCallback(
    (e) => {
      e.stopPropagation();
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("modalClose")
      )
        dispatch({ type: "UPLOAD_CONFIRMATION_MODAL", payload: false });
    },
    [dispatch]
  );

  const handleContinue = useCallback(() => {
    dispatch(handleFileUpload(null, true));
    dispatch({ type: "UPLOAD_CONFIRMATION_MODAL", payload: false });
  }, [dispatch]);

  return (
    <div className="modal" onClick={handleCancel}>
      <div className="confirmationmodal">
        <div className="modalHeader">
          Confirm Upload
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
            A file already exists with the file name. Do you want to upload?
          </div>
          <div className="statusFooter">
            <button
              onClick={handleContinue}
              style={{
                border: "none",
                backgroundColor: "#04aa6d",
                fontWeight: 600,
                width: "5rem",
                height: "1.4rem",
                borderRadius: ".3rem",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FileUploadConfirmationModal);
