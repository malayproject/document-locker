import { redirect } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

export const getUser = async () => {
  return fetch("http://localhost:5100/current-user");
};

export const getAbsoluteUrl = (relPath) => {
  if (relPath === "/auth/google") return `http://localhost:5100${relPath}`;
  else return `http://localhost:3000${relPath}`;
};

export const loader = async () => {
  const user = await getUser();
  if (!user) {
    return <LandingPage />;
  }
  return <Home />;
};
