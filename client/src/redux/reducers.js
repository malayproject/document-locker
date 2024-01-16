import { combineReducers } from "redux";
import { TYPEFILTER } from "../constants";

const initialTableDataState = {
  files: [],
  filesToBeDownloaded: [],
  filesWithPresignedUrls: [],
  totalFileCount: 0,
  isFilesFetching: false,
  markedDeleted: false,
  currentPage: 1,
  rowsPerPage: 5,
};

const initialUserTagsState = {
  userTags: [],
  isUserTagsFetching: false,
};

const initialFiltersState = {
  typeFilter: TYPEFILTER.TYPE,
  typeFilterMenuExpanded: false,
  searchFilterText: "",
  selectedTagIds: [],
};

const initialSidebarState = {
  userTagsFeatureExpanded: false,
  sidebarExpanded: true,
};

const initialSelectFileState = {
  selectedFile: null,
  modalTempSelectedFileTagIds: [],
  // starred: false,
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
    case "SET_FILES_TO_BE_DOWNLOADED":
      return { ...state, filesToBeDownloaded: action.payload };
    case "RESET_FILES_TO_BE_DOWNLOADED":
      return { ...state, filesToBeDownloaded: [] };
    // case "ADD_FILE_TO_BE_DOWNLOADED":
    //   return { ...state, filesToBeDownloaded: [...state.filesToBeDownloaded, action.payload] };
    // case "REMOVE_FILE_TO_BE_DOWNLOADED":
    //   return { ...state, filesToBeDownloaded: action.payload };
    case "FILES_DOWNLOADING_PENDING":
      return {
        ...state,
        isFilesDownloadInProgress: true,
        filesWithPresignedUrls: [],
        error: null,
      };
    case "FILES_DOWNLOADING_FULFILLED":
      return {
        ...state,
        filesWithPresignedUrls: action.payload,
        isFilesDownloadInProgress: false,
        filesToBeDownloaded: [],
      };
    case "FILES_DOWNLOADING_REJECTED":
      return {
        ...state,
        isFilesDownloadInProgress: false,
        filesToBeDownloaded: [],
        error: action.error,
      };
    default:
      return state;
  }
};

const userTagsReducer = (state = initialUserTagsState, action) => {
  switch (action.type) {
    case "USER_TAGS_LOADING_PENDING":
      return { ...state, isUserTagsFetching: true, error: null };
    case "USER_TAGS_LOADING_FULFILLED":
      return { ...state, isUserTagsFetching: false, userTags: action.payload };
    case "USER_TAGS_LOADING_REJECTED":
      return { ...state, isUserTagsFetching: false, error: action.error };
    default:
      return state;
  }
};

const selectFileReducer = (state = initialSelectFileState, action) => {
  switch (action.type) {
    case "SELECT_FILE":
      return {
        ...state,
        selectedFile: action.payload,
        modalTempSelectedFileTagIds: action.payload.tagIds,
        // starred: action.payload.starred,
      };
    case "ADD_MODAL_TEMP_TAGID":
      if (state.modalTempSelectedFileTagIds.includes(action.payload))
        return state;
      return {
        ...state,
        modalTempSelectedFileTagIds: [
          ...state.modalTempSelectedFileTagIds,
          action.payload,
        ],
      };
    case "TOGGLE_STAR_STATUS":
      return {
        ...state,
        // starred: !state.starred,
      };
    case "SAVE_SELECTED_FILE":
      return {
        ...state,
        selectedFile: {
          ...state.selectedFile,
          tagIds: [...state.modalTempSelectedFileTagIds],
          // starred: state.starred,
        },
      };
    case "REMOVE_MODAL_TEMP_TAGID":
      if (state.modalTempSelectedFileTagIds.includes(action.payload))
        return {
          ...state,
          modalTempSelectedFileTagIds: [
            ...state.modalTempSelectedFileTagIds.filter(
              (modalTempSelectedFileTagId) =>
                modalTempSelectedFileTagId !== action.payload
            ),
          ],
        };
      return state;
    case "UNSELECT_FILE":
      return {
        ...state,
        selectedFile: null,
        modalTempSelectedFileTagIds: [],
        // starred: null,
      };
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

const sidebarReducer = (state = initialSidebarState, action) => {
  switch (action.type) {
    case "SIDEBAR_EXPAND":
      return {
        ...state,
        sidebarExpanded: !state.sidebarExpanded,
        userTagsFeatureExpanded: false,
      };
    case "USER_TAGS_EXPAND":
      return {
        ...state,
        userTagsFeatureExpanded: !state.userTagsFeatureExpanded,
      };
    // case "USER_TAGS_COLLAPSE":
    //   return { ...state, userTagsFeatureExpanded: false };
    default:
      return state;
  }
};

const filtersReducer = (state = initialFiltersState, action) => {
  switch (action.type) {
    case "SET_TYPE_FILTER":
      return { ...state, typeFilter: action.payload };
    case "RESET_TYPE_FILTER":
      return {
        ...state,
        typeFilter: TYPEFILTER.TYPE,
        typeFilterMenuExpanded: false,
      };
    case "TOGGLE_TYPE_FILTER_MENU":
      return {
        ...state,
        typeFilterMenuExpanded: !state.typeFilterMenuExpanded,
      };
    case "SET_SEARCH_FILTER_TEXT":
      return {
        ...state,
        searchFilterText: action.payload,
      };
    case "USER_SELECTED_TAG_ADD":
      if (state.selectedTagIds.includes(action.payload)) return state;
      return {
        ...state,
        selectedTagIds: [...state.selectedTagIds, action.payload],
      };
    case "USER_SELECTED_TAG_REMOVE":
      if (state.selectedTagIds.includes(action.payload))
        return {
          ...state,
          selectedTagIds: [
            ...state.selectedTagIds.filter(
              (selectedTagId) => selectedTagId !== action.payload
            ),
          ],
        };
      return state;
    case "RESET_USER_SELECTED_TAGS":
      return {
        ...state,
        selectedTagIds: [],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tableData: tableDataReducer,
  selectFile: selectFileReducer,
  showModals: modalsReducer,
  fileUpload: fileUploadReducer,
  userTagsData: userTagsReducer,
  sidebar: sidebarReducer,
  filters: filtersReducer,
});

export default rootReducer;
