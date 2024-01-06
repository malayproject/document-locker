import { combineReducers } from "redux";

const initialTableDataState = {
  files: [],
  totalFileCount: 0,
  isFilesFetching: false,
  markedDeleted: false,
  currentPage: 1,
  rowsPerPage: 5,
};

const initialSelectFileState = {
  selectedFile: null,
};

const initialFileUploadState = {
  fileToBeUploaded: null,
  fileUploading: false,
  fileUploadSuccessful: false,
  forceUpload: false,
};

const initalModalsState = {
  showFileInfoModal: false,
  showUploadStausModal: false,
  showUploadConfirmationModal: false,
  showFileSoftDeleteConfirmationModal: false,
};

const tableDataReducer = (state = initialTableDataState, action) => {
  switch (action.type) {
    case "FILES_LOADING_PENDING":
      return { ...state, isFilesFetching: true, error: null };
    case "FILES_LOADING_FULFILLED":
      return {
        ...state,
        files: action.payload.files,
        totalFileCount: action.payload.totalFileCount,
        isFilesFetching: false,
      };
    case "FILES_LOADING_REJECTED":
      return { ...state, isFilesFetching: false, error: action.error };
    case "CURRENT_PAGE_UPDATE":
      return { ...state, currentPage: action.payload };
    case "ROWS_PER_PAGE_UPDATE":
      return { ...state, rowsPerPage: action.payload };
    case "MARKED_DELETED_UPDATE":
      return { ...state, markedDeleted: action.payload };
    default:
      return state;
  }
};

const selectFileReducer = (state = initialSelectFileState, action) => {
  switch (action.type) {
    case "SELECT_FILE":
      return { ...state, selectedFile: action.payload };
    default:
      return state;
  }
};

const fileUploadReducer = (state = initialFileUploadState, action) => {
  switch (action.type) {
    case "FILE_UPLOAD_PENDING":
    case "FILE_UPDATE_PENDING":
      return {
        ...state,
        fileToBeUploaded: action.payload,
        fileUploading: true,
        error: null,
      };
    case "FILE_UPLOAD_FULFILLED":
    case "FORCE_FILE_UPLOAD_FULFILLED":
    case "FILE_UPDATE_FULFILLED":
      return {
        fileToBeUploaded: null,
        fileUploading: false,
        fileUploadSuccessful: true,
        forceUpload: false,
      };
    case "FILE_UPLOAD_REJECTED":
      return {
        ...state,
        // fileToBeUploaded: null,
        fileUploading: false,
        error: action.error,
      };
    case "FORCE_FILE_UPLOAD_PENDING":
      return {
        ...state,
        fileToBeUploaded: action.payload,
        fileUploading: true,
        forceUpload: true,
      };
    case "FORCE_FILE_UPLOAD_REJECTED":
    case "FILE_UPDATE_REJECTED":
      return {
        ...state,
        fileToBeUploaded: null,
        fileUploading: false,
        forceUpload: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const modalsReducer = (state = initalModalsState, action) => {
  switch (action.type) {
    case "FILE_INFO_MODAL":
      return { ...state, showFileInfoModal: action.payload };
    case "UPLOAD_STATUS_MODAL":
      return { ...state, showUploadStatusModal: action.payload };
    case "UPLOAD_CONFIRMATION_MODAL":
      return { ...state, showUploadConfirmationModal: action.payload };
    case "FILE_SOFT_DELETE_CONFIRMATION_MODAL":
      return { ...state, showFileSoftDeleteConfirmationModal: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tableData: tableDataReducer,
  selectFile: selectFileReducer,
  showModals: modalsReducer,
  fileUpload: fileUploadReducer,
});

export default rootReducer;
