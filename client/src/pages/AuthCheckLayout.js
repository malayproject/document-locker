import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../helpers";

const AuthCheckLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const userInfo = await getUser();
        console.log("userInfo", userInfo);
        if (userInfo.data) navigate("home");
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, [navigate]);
  return <Outlet />;
};

export default AuthCheckLayout;
