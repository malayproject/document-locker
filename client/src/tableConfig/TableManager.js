import React, { memo, useEffect } from "react";
import BaseTable from "./BaseTable";
import PaginationComponent from "../components/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilesData } from "../redux/actionCreators";
import FilterComponent from "../components/FilterComponent";

const TableManager = ({ setIsFileUpdating, isFileUpdating }) => {
  const dispatch = useDispatch();

  const { currentPage, rowsPerPage, isFilesFetching, filesWithPresignedUrls } =
    useSelector((state) => state.tableData);

  useEffect(() => {
    dispatch(fetchFilesData());
  }, [currentPage, rowsPerPage, dispatch]);

  useEffect(() => {
    if (filesWithPresignedUrls.length) {
      for (const filesWithPresignedUrl of filesWithPresignedUrls) {
        const link = document.createElement("a");
        link.href = filesWithPresignedUrl.preSignedUrl;
        link.download = filesWithPresignedUrl.fileName;
        // link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }, [filesWithPresignedUrls, dispatch]);

  return (
    <div className="tableManager">
      <FilterComponent />
      <div style={{ overflowY: "scroll", height: "89vh" }}>
        <BaseTable
          setIsFileUpdating={setIsFileUpdating}
          isFileUpdating={isFileUpdating}
        />
      </div>
      <PaginationComponent />
    </div>
  );
};

export default memo(TableManager);
