import { memo, useCallback } from "react";
const FileUploadConfirmationModal = ({
  setShowConfirmationModal,
  setFile,
  setForceUpload,
}) => {
  const handleCancel = useCallback(() => {
    setShowConfirmationModal(false);
    // setFile({ uploadStatus: "cancelled" });
    setFile(null);
  }, [setFile, setShowConfirmationModal]);

  const handleContinue = useCallback(() => {
    setForceUpload(true);
    setShowConfirmationModal(false);
  }, [setForceUpload, setShowConfirmationModal]);
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
