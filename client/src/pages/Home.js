import axios from "axios";
import React, { useEffect, useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../helpers";
import { useDispatch, useSelector } from "react-redux";
import img from "../assets/google-logo.png";
import Sidebar from "../components/Sidebar";
import FileUploadConfirmationModal from "../components/FileUploadConfirmationModal";
import FileUploadStatusModal from "../components/FileUploadStatusModal";
// import BaseTable from "../tableConfig/BaseTable.js";
// import GlobalFilteringTable from "../tableConfig/GlobalFilteringTable.js";
import TableManager from "../tableConfig/TableManager.js";
import FileInfoModal from "../components/FileInfoModal.js";
import FileSoftDeleteConfirmationModal from "../components/FileSoftDeleteConfirmationModal.js";

const Home = (props) => {
  const navigate = useNavigate();

  const {
    showFileInfoModal,
    showUploadStatusModal,
    showUploadConfirmationModal,
    showFileSoftDeleteConfirmationModal,
  } = useSelector((state) => state.showModals);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [isFileUpdating, setIsFileUpdating] = useState(false);

  const dispatch = useDispatch();

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

  // console.log("file 36", file);

  return (
    <div className="home">
      <Sidebar handleLogout={handleLogout} />
      <TableManager
        setIsFileUpdating={setIsFileUpdating}
        isFileUpdating={isFileUpdating}
      />
      {/* <BaseTable uploadSuccessful={uploadSuccessful} /> */}
      {showUploadConfirmationModal && <FileUploadConfirmationModal />}
      {showUploadStatusModal && <FileUploadStatusModal />}
      {showFileInfoModal && <FileInfoModal />}
      {showFileSoftDeleteConfirmationModal && (
        <FileSoftDeleteConfirmationModal
          // setShowFileSoftDeleteConfModal={setShowFileSoftDeleteConfModal}
          isFileUpdating={isFileUpdating}
          // selectedFileInfo={selectedFileInfo}
        />
      )}
    </div>
  );
};

export default memo(Home);
