import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import BaseTable from "./BaseTable";
import PaginationComponent from "../components/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilesData } from "../redux/actionCreators";

const TableManager = ({
  uploadSuccessful,
  setIsFileUpdating,
  isFileUpdating,
}) => {
  const dispatch = useDispatch();

  const { currentPage, rowsPerPage, isFilesFetching } = useSelector(
    (state) => state.tableData
  );

  useEffect(() => {
    dispatch(fetchFilesData());
  }, [currentPage, rowsPerPage, dispatch]);

  return (
    <div className="tableManager">
      {isFilesFetching ? (
        <div className="loadingtable">
          <h1>Loading...</h1>
        </div>
      ) : (
        // <FilterComponent />
        <BaseTable
          setIsFileUpdating={setIsFileUpdating}
          isFileUpdating={isFileUpdating}
        />
      )}
      <PaginationComponent />
    </div>
  );
};

export default memo(TableManager);
