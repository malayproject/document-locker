import { memo, useCallback } from "react";

const FileUploadStatusModal = ({
  setShowFileUploadStatusModal,
  setUploadSuccessful,
}) => {
  const handleClick = useCallback(() => {
    setShowFileUploadStatusModal(false);
    setUploadSuccessful(true);
  }, [setShowFileUploadStatusModal, setUploadSuccessful]);
  return (
    <div className="fileuploadstatusmodal">
      <div className="statustext">File uploaded successfully.</div>
      <div className="statusfooter">
        <button onClick={handleClick}>Ok</button>
      </div>
    </div>
  );
};

export default memo(FileUploadStatusModal);
