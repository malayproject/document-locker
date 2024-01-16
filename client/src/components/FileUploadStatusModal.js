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
  // return (
  //   <div className="fileuploadstatusmodal">
  //     <div className="statustext">File uploaded successfully.</div>
  //     <div className="statusfooter">
  //       <button onClick={handleClick}>Ok</button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="modal" onClick={handleClick}>
      <div className="fileuploadstatusmodal">
        <div className="modalHeader">
          Upload confirmed
          <div className="btnsContainer">
            <button
              className="modalClose"
              onClick={handleClick}
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
          <div className="statusText">File uploaded successfully.</div>
          <div className="statusFooter">
            <button
              onClick={handleClick}
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
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FileUploadStatusModal);
