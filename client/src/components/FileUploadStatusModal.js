import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchFilesData } from "../redux/actionCreators";

const FileUploadStatusModal = () => {
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch({ type: "UPLOAD_STATUS_MODAL", payload: false });
    dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
    dispatch(fetchFilesData());
  }, [dispatch]);
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
