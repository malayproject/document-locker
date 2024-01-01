import axios from "axios";
import React, { useEffect, useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../helpers";
import img from "../assets/google-logo.png";
import Sidebar from "../components/Sidebar";
import FileUploadConfirmationModal from "../components/FileUploadConfirmationModal";
import FileUploadStatusModal from "../components/FileUploadStatusModal";

const Home = (props) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [forceUpload, setForceUpload] = useState(false);
  const [showFileUploadStatusModal, setShowFileUploadStatusModal] =
    useState(false);

  const handleLogout = async (e) => {
    try {
      await axios.get("http://localhost:5100/api/logout");
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

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

  const handleFileChange = useCallback(
    (e) => {
      debugger;
      if (!e.target.files?.length) return;
      const inputFile = e.target.files[0];
      setFile(inputFile);
    },
    [setFile]
  );

  console.log("file 36", file);

  useEffect(() => {
    (async () => {
      try {
        const formData = new FormData();
        console.log(img);
        if (file) {
          formData.append("image", file);
          const serverRes = await axios.post(
            `http://localhost:5100/api/uploadFile?forceUpload=${forceUpload}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("serverRes.data", serverRes.data);
          setFile(null);
          setForceUpload(false);
          setShowFileUploadStatusModal(true);
        }
      } catch (err) {
        console.log(err);
        if (err.response?.data?.code === 3006) {
          debugger;
          setForceUpload(false);
          setShowConfirmationModal(true);
        }
      }
    })();
  }, [file, forceUpload]);

  return (
    <div className="home">
      <Sidebar
        handleFileChange={handleFileChange}
        handleLogout={handleLogout}
        file={file}
      />
      <div className="mainContainer"></div>
      {showConfirmationModal && (
        <FileUploadConfirmationModal
          setShowConfirmationModal={setShowConfirmationModal}
          setFile={setFile}
          setForceUpload={setForceUpload}
        />
      )}
      {showFileUploadStatusModal && (
        <FileUploadStatusModal
          setShowFileUploadStatusModal={setShowFileUploadStatusModal}
        />
      )}
    </div>
  );
};

export default memo(Home);
