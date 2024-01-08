import axios from "axios";

export const handleFileUpload = (file, forceUpload) => {
  if (!file && !forceUpload) return {};
  return async (dispatch, getState) => {
    const pendingActionType = forceUpload
      ? "FORCE_FILE_UPLOAD_PENDING"
      : "FILE_UPLOAD_PENDING";
    const fulfilledActionType = forceUpload
      ? "FORCE_FILE_UPLOAD_FULFILLED"
      : "FILE_UPLOAD_FULFILLED";
    const rejectedActionType = forceUpload
      ? "FORCE_FILE_UPLOAD_REJECTED"
      : "FILE_UPLOAD_REJECTED";
    try {
      dispatch({
        type: pendingActionType,
        payload: file || getState().fileUpload.fileToBeUploaded,
      });
      const fileUploadState = getState().fileUpload;
      const formData = new FormData();
      formData.append("image", getState().fileUpload.fileToBeUploaded);
      const serverRes = await axios.post(
        `http://localhost:5100/api/uploadFile?forceUpload=${fileUploadState.forceUpload}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({ type: fulfilledActionType });
      dispatch({ type: "UPLOAD_STATUS_MODAL", payload: true });
    } catch (err) {
      dispatch({ type: rejectedActionType, error: err.message });
      dispatch({ type: "UPLOAD_CONFIRMATION_MODAL", payload: true });
    }
  };
};

export const fetchFilesData = () => {
  return async (dispatch, getState) => {
    const { currentPage, rowsPerPage, markedDeleted } = getState().tableData;
    try {
      dispatch({ type: "FILES_LOADING_PENDING" });
      const data = await axios.get(
        `http://localhost:5100/api/files?page=${currentPage}&limit=${rowsPerPage}&markedDeleted=${markedDeleted}`
      );
      dispatch({
        type: "FILES_LOADING_FULFILLED",
        payload: {
          files: data.data?.files,
          totalFileCount: data.data?.totalFileCount,
        },
      });
    } catch (err) {
      dispatch({
        type: "FILES_LOADING_REJECTED",
      });
      console.error(err.message);
    }
  };
};

export const fetchTagsData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "USER_TAGS_LOADING_PENDING" });
      const data = await axios.get("http://localhost:5100/api/tags");
      dispatch({
        type: "USER_TAGS_LOADING_FULFILLED",
        payload: data.data.tags,
      });
    } catch (err) {
      console.error(err.message);
      dispatch({ type: "USER_TAGS_LOADING_REJECTED", error: err.message });
    }
  };
};

// export const deleteFile = (e) => {

//     console.log("86", e);
//     setSelectedFileInfo(row?.original);
//     setShowFileSoftDeleteConfModal(true);

//     e.stopPropagation();
//   }
