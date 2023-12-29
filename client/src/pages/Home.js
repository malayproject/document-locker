import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../helpers";
import { img } from "../assets/google-logo.png";

const Home = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await getUser();
        console.log("userInfo", userInfo);
        if (!userInfo.data) navigate("/");
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, [navigate]);

  const handleLogout = async (e) => {
    try {
      await axios.get("http://localhost:5100/api/logout");
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUploadFile = async () => {
    try {
      // const res = await axios.post('http://localhost:5100/api/uploadFile');
      const imgFetchRes = await fetch("../assets/github-mark.png");
      const buffer = await imgFetchRes.arrayBuffer();
      // const blob = await imgFetchRes.blob();
      console.log("blob", buffer, imgFetchRes);
      const serverRes = await axios.post(
        "http://localhost:5100/api/uploadFile",
        { blobObj: buffer }
      );
      console.log("serverRes.data", serverRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <div>Home page: you are logged in</div>
      <button onClick={handleLogout}>logout</button>
      <button onClick={handleUploadFile}>upload file</button>
    </div>
  );
};

export default Home;
