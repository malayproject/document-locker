import axios from "axios";
axios.defaults.withCredentials = true;

export const getUser = async () => {
  //   alert("axios");
  return axios.get("http://localhost:5100/current-user");
};

export const getAbsoluteUrl = (relPath) => {
  if (relPath === "/auth/google") return `http://localhost:5100${relPath}`;
  else return `http://localhost:3000${relPath}`;
};
