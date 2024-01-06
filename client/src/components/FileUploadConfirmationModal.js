import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { handleFileUpload } from "../redux/actionCreators";

const FileUploadConfirmationModal = () => {
  const dispatch = useDispatch();

  const handleCancel = useCallback(() => {
    dispatch({ type: "UPLOAD_CONFIRMATION_MODAL", payload: false });
  }, [dispatch]);

  const handleContinue = useCallback(() => {
    dispatch(handleFileUpload(null, true));
    dispatch({ type: "UPLOAD_CONFIRMATION_MODAL", payload: false });
  }, [dispatch]);
  return (
    <div className="confirmationmodal">
      <div className="confirmationText">
        A file already exists with the file name.
      </div>
      <div className="confirmationFooter">
        <button onClick={handleContinue}>Continue</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default memo(FileUploadConfirmationModal);
