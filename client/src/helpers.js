import axios from "axios";
import { MIMETYPES, MIMETYPE_VS_DISPLAYTEXT } from "./constants";

export const getUser = async () => {
  //   alert("axios");
  return axios.get("/current-user");
};

export const getAbsoluteUrl = (relPath) => {
  if (relPath === "/auth/google")
    return `${process.env.REACT_APP_SERVER_URL}${relPath}`;
  else return `http://localhost:3000${relPath}`;
};

export const getFileText = (mimeType) => {
  let fileText = null;
  switch (mimeType) {
    case MIMETYPES.PNG:
      fileText = MIMETYPE_VS_DISPLAYTEXT[MIMETYPES.PNG];
      break;
    case MIMETYPES.JPEG:
      fileText = MIMETYPE_VS_DISPLAYTEXT[MIMETYPES.JPEG];
      break;
    case MIMETYPES.MPEG:
      fileText = MIMETYPE_VS_DISPLAYTEXT[MIMETYPES.MPEG];
      break;
    case MIMETYPES.PDF:
      fileText = MIMETYPE_VS_DISPLAYTEXT[MIMETYPES.PDF];
      break;
    case MIMETYPES.MP4:
      fileText = MIMETYPE_VS_DISPLAYTEXT[MIMETYPES.MP4];
      break;
    case MIMETYPES.CSV:
      fileText = MIMETYPE_VS_DISPLAYTEXT[MIMETYPES.CSV];
      break;
    default:
      fileText = MIMETYPE_VS_DISPLAYTEXT.DEFAULT;
  }
  return fileText;
};

export const getBytesToKiloBytes = (bytes) => {
  return (Number.parseInt(bytes) / 1024).toFixed(2);
};
