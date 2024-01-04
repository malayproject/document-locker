import axios from "axios";
import { MIMETYPES, MIMETYPE_VS_DISPLAYTEXT } from "./constants";
axios.defaults.withCredentials = true;

export const getUser = async () => {
  //   alert("axios");
  return axios.get("http://localhost:5100/current-user");
};

export const getAbsoluteUrl = (relPath) => {
  if (relPath === "/auth/google") return `http://localhost:5100${relPath}`;
  else return `http://localhost:3000${relPath}`;
};

export const getFileText = (mimeType) => {
  let fileText = MIMETYPE_VS_DISPLAYTEXT.DEFAULT;
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
    default:
      return;
  }
  return fileText;
};

export const getBytesToKiloBytes = (bytes) => {
  return (Number.parseInt(bytes) / 1024).toFixed(2);
};
