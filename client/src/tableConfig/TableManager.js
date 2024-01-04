import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import BaseTable from "./BaseTable";
import PaginationComponent from "../components/PaginationComponent";

const TableManager = ({
  uploadSuccessful,
  setShowFileInfoModal,
  setSelectedFileInfo,
  setShowFileSoftDeleteConfModal,
  setIsFileUpdating,
  isFileUpdating,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filesData, setFilesData] = useState([]);
  const [totalFileCount, setTotalFileCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFilesData = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get(
        `http://localhost:5100/api/files?page=${currentPage}&limit=${rowsPerPage}`
      );
      console.log("data 11", data.data.files, data.data.totalFileCount);
      setFilesData(data.data?.files || []);
      setTotalFileCount(data.data?.totalFileCount);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (uploadSuccessful) {
      fetchFilesData();
      setCurrentPage(1);
    }
  }, [uploadSuccessful]);

  useEffect(() => {
    fetchFilesData();
  }, [currentPage, rowsPerPage]);

  return (
    <div className="tableManager">
      {isLoading ? (
        <div className="loadingtable">
          <h1>Loading...</h1>
        </div>
      ) : (
        <BaseTable
          filesData={filesData}
          setShowFileInfoModal={setShowFileInfoModal}
          setSelectedFileInfo={setSelectedFileInfo}
          setShowFileSoftDeleteConfModal={setShowFileSoftDeleteConfModal}
          setIsFileUpdating={setIsFileUpdating}
          isFileUpdating={isFileUpdating}
        />
      )}
      <PaginationComponent
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        totalFileCount={totalFileCount}
      />
    </div>
  );
};

export default memo(TableManager);
