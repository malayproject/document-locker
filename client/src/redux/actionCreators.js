import axios from "axios";
import { TYPEFILTER_VS_MIMETYPES_MAP } from "../constants";

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
        `${
          process.env.NODE_ENV === "production" ? "" : "http://localhost:5100"
        }/api/uploadFile?forceUpload=${fileUploadState.forceUpload}`,
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

export const fetchFilesData = (options) => {
  const { starred } = options || {};
  return async (dispatch, getState) => {
    const { currentPage, rowsPerPage, markedDeleted } = getState().tableData;
    const { typeFilter, searchFilterText, selectedTagIds } = getState().filters;
    const mimeTypes = TYPEFILTER_VS_MIMETYPES_MAP[typeFilter];
    const mimeTypesString = mimeTypes.toString();
    const selectedTagIdsString = selectedTagIds.toString();
    try {
      dispatch({ type: "FILES_LOADING_PENDING" });
      const data = await axios.get(
        `${
          process.env.NODE_ENV === "production" ? "" : "http://localhost:5100"
        }/api/files?page=${currentPage}&limit=${rowsPerPage}&markedDeleted=${markedDeleted}&searchFilterText=${searchFilterText}&typeFilter=${typeFilter}&mimeTypes=${mimeTypesString}${
          starred ? "&starred=true" : ""
        }${
          selectedTagIdsString ? `&selectedTagIds=${selectedTagIdsString}` : ""
        }`
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
      console.log("NODE_ENV", process.env.NODE_ENV);
      const data = await axios.get(
        `${
          process.env.NODE_ENV === "production" ? "" : "http://localhost:5100"
        }/api/tags`
      );
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

export const handleFileFieldsUpdate = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "SAVE_SELECTED_FILE" });
    dispatch({
      type: "FILE_UPDATE_PENDING",
      payload: getState().selectFile.selectedFile,
    });
    try {
      await axios.put(
        `${
          process.env.NODE_ENV === "production" ? "" : "http://localhost:5100"
        }/api/file/${getState().fileUpload.fileToBeUploaded._id}`,
        {
          fileToBeUploaded: getState().fileUpload.fileToBeUploaded,
        }
      );
      dispatch({ type: "FILE_UPDATE_FULFILLED" });
      dispatch(fetchFilesData());
    } catch (err) {
      dispatch({ type: "FILE_UPDATE_REJECTED", error: err.message });
    }
  };
};
