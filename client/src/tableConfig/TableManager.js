import React, { memo, useEffect } from "react";
import BaseTable from "./BaseTable";
import PaginationComponent from "../components/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilesData } from "../redux/actionCreators";
import FilterComponent from "../components/FilterConponent";

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
